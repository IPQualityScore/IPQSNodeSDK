import {UrlValidationResponse} from "@src/url/interfaces";
import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {URL_PROP_NAME} from "@src/url/const";
import {ERRORS} from "@src/url/const";
import {whichUrl} from "@src/utils";

export const getMaliciousUrlResult = async (privateKey: string, params: Request): Promise<UrlValidationResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

export const postMaliciousUrlResult = async (privateKey: string, params: Request): Promise<UrlValidationResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "POST", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    let url;
    if (params.requestParameters && "url" in params.requestParameters) {
        url = params.requestParameters.url;
    }
    if (!url) {
        errors.push(ERRORS.MISSING_URL);
    }
    return errors;
}

export default {getMaliciousUrlResult, postMaliciousUrlResult};