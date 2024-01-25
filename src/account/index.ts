import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {CreditUsageResponse} from "@src/account/interfaces";
import {URL_PROP_NAME} from "@src/account/const";
import {disallowPKConfigs, sanitizeExportType} from "@src/utils";
import {ERRORS} from "@src/postback/const";
import {BASE_URL} from "@src/utils/request/const";

export const getCreditUsageResult = async (privateKey: string, params: Request): Promise<CreditUsageResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    if(!disallowPKConfigs(params)) {
        errors.push(ERRORS.PK_CONFIG_NOT_ALLOWED)
    }
    return errors;
}

export const whichUrl = (privateKey: string, params: Request, urlPropName: string): string => {
    const {config: {exportType}} = params;
    const sanitizedExportType = sanitizeExportType(exportType);
    return `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}`;
}

export default getCreditUsageResult;