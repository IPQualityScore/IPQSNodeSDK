import {BlankObject, FilterObjectType} from "@src/utils/interfaces";
import {Request} from "@src/utils/request/interfaces";
import {BASE_URL} from "@src/utils/request/const";
import {PostbackUpdateParams} from "@src/postback/interfaces";
import {RequestListUpdateParameters} from "@src/requests/interfaces";
import {DATE_REGEXES} from "@src/utils/const";

export const sanitizeExportType = (exportType: string): string => {
    const validValues = ['json', 'xml'];
    if (validValues.includes(exportType)) {
        return exportType;
    }
    return 'json';
};

export const serializeParams = (params: object): string => {
    return  Object.entries(params).map(([key, value]) => {
        return `${key}=${encodeURIComponent(value)}`;
    }).join('&');
}

export const filterObjectByKeys = (obj: FilterObjectType, keysToRemove: string[]): BlankObject => {
    const filteredObj: BlankObject = {};
    Object.keys(obj).forEach((key) => {
        if (!keysToRemove.includes(key)) {
            // We already check for types before this point, so we can use <never>
            filteredObj[key] = <never>obj[key];
        }
    });
    return filteredObj;
}

export const isValidDateFormat = (input: string, regexArr: RegExp[]): boolean => {
    if (!regexArr.some(regex => regex.test(input))) {
        return false;
    }
    const date = new Date(input);
    return !isNaN(date.getTime());
}

export const disallowPKConfigs = (params: Request): boolean => {
    const {config: {pkAsGetOrPostParam, pkAsHeader}} = params;
    return !(pkAsGetOrPostParam || pkAsHeader);
}

export const getIpAddress = (ipAddress: string): string => {
    const defaultIp = '';
    return ipAddress ?? defaultIp;
};

export const whichUrl = (privateKey: string, params: Request, urlPropName: string): string => {
    const {config: {exportType, pkAsGetOrPostParam, pkAsHeader}, requestParameters} = params;
    const sanitizedExportType = sanitizeExportType(exportType);
    let value;
    if(urlPropName === 'requests') {
        value = 'list';
    } else {
        value = encodeURIComponent((requestParameters as never)[urlPropName]);
    }
    return (pkAsGetOrPostParam || pkAsHeader)
        ?
        `${BASE_URL}/${sanitizedExportType}/${urlPropName}` :
        `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}/${value}`;
}

export const updateParamsToOptionallyAddPK = (params: Request, privateKey: string, urlPropName: string) => {
    const {config: {pkAsGetOrPostParam, pkAsHeader}} = params;
    return (pkAsGetOrPostParam || pkAsHeader)
        ? { key: privateKey, ...params.requestParameters } :
        filterObjectByKeys(<FilterObjectType><unknown>params.requestParameters, [urlPropName]);
}

export const getPKHeader = (params: Request, privateKey: string) => {
    const {config: {pkAsHeader}} = params;
    let retVal = {}
    if (pkAsHeader) {
        retVal = { "IPQS-KEY": privateKey }
    }
    return retVal;
}

export const generateUpdatePostParams = (updateParameters: PostbackUpdateParams | RequestListUpdateParameters): object => {
    const updatedParams: {[key: string]: string} = {};
    for (const [key, value] of Object.entries(updateParameters)) {
        const newKey = `update[${key}]`;
        updatedParams[newKey] = `${encodeURIComponent(value)}`;
    }
    return updatedParams;
}

export const validateDates = (obj: FilterObjectType, keysToTest: string[]): boolean => {
    for (const key in obj) {
        if (keysToTest.includes(key)) {
            const value = <string>obj[key];
            if (
                !isValidDateFormat(value, DATE_REGEXES)) {
                return false;
            }
        }
    }
    return true;
}