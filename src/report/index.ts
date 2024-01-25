import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {ReportResponse} from "./interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/report/const";
import {disallowPKConfigs, sanitizeExportType} from "@src/utils";
import {BASE_URL} from "@src/utils/request/const";

export const getReportResult = async (privateKey: string, params: Request): Promise<ReportResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    if(!disallowPKConfigs(params)) {
        errors.push(ERRORS.PK_CONFIG_NOT_ALLOWED)
    }
    return errors;
}

const whichUrl = (privateKey: string, params: Request, urlPropName: string): string => {
    const {config: {exportType}} = params;
    const sanitizedExportType = sanitizeExportType(exportType);
    return `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}`;
}

export default getReportResult;