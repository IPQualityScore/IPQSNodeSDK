import {EmailResponse} from "@src/email/interfaces";
import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {URL_PROP_NAME, ERRORS} from "@src/email/const";
import {whichUrl} from "@src/utils";

export const getEmailValidationResult = async (privateKey: string, params: Request): Promise<EmailResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

export const postEmailValidationResult = async (privateKey: string, params: Request): Promise<EmailResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "POST", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    let email;
    if (params.requestParameters && "email" in params.requestParameters) {
        email = params.requestParameters.email;
    }
    if (!email) {
        errors.push(ERRORS.MISSING_EMAIL);
    }
    return errors;
}

export default {getEmailValidationResult, postEmailValidationResult};