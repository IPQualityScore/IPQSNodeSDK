import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/leaked/const";
import {getResult} from "@src/utils/request";
import {disallowPKConfigs, sanitizeExportType} from "@src/utils";
import {LeakedParams, LeakedResponse} from "@src/leaked/interfaces";
import {BASE_URL} from "@src/utils/request/const";

export const getLeakedResults = async (privateKey: string, params: Request): Promise<LeakedResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    const {requestParameters} = params;
    if(!validateRequestParams(<object>requestParameters)) {
        errors.push(ERRORS.INCORRECT_REQUEST_PARAMETERS);
    }
    if(!disallowPKConfigs(params)) {
        errors.push(ERRORS.PK_CONFIG_NOT_ALLOWED)
    }
    return errors;
}

export const whichUrl = (privateKey: string, params: Request, urlPropName: string): string => {
    const {config: {exportType}} = params;
    const requestParameters = <LeakedParams>params.requestParameters;
    const type = requestParameters.type;
    const value = requestParameters.value;
    const sanitizedExportType = sanitizeExportType(exportType);
    return `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${type}/${privateKey}/${value}`;
}

const validateRequestParams = (obj: object): boolean => {
    return ('type' in obj) && ('value' in obj);
}

export default getLeakedResults;