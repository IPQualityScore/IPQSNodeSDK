import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/postback/const";
import {getResult} from "@src/utils/request";
import {disallowPKConfigs, sanitizeExportType, validateDates} from "@src/utils";
import {FilterObjectType} from "@src/utils/interfaces";
import {postback, PostbackResponse} from "@src/postback/interfaces";
import {BASE_URL} from "@src/utils/request/const";

export const getPostbackResult = async (privateKey: string, params: Request): Promise<PostbackResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const { requestParameters, updateParameters } = params;
    const errors: string[] = [];
    if(!validateRequestParams(<postback>requestParameters)) {
        errors.push(ERRORS.INCORRECT_REQUEST_PARAMETERS);
    }
    if(!validateDates(<FilterObjectType><unknown>updateParameters, ['ConversionDate', 'ClickDate'])) {
        errors.push(ERRORS.INCORRECT_DATE_PARAMETERS);
    }
    if(!disallowPKConfigs(params)) {
        errors.push(ERRORS.PK_CONFIG_NOT_ALLOWED)
    }
    return errors;
}

export const whichUrl = (privateKey: string, params: Request, urlPropName: string): string => {
    const {config: {exportType}} = params;
    const sanitizedExportType = sanitizeExportType(exportType);
    return `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}/`;
}

const validateRequestParams = (obj: postback): boolean => {
    return ('request_id' in obj) || ('type' in obj);
}

export default getPostbackResult;