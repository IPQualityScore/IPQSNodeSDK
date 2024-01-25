import {PhoneResponse} from "@src/phone/interfaces";
import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {URL_PROP_NAME} from "./const";
import {ERRORS} from "@src/phone/const";
import {whichUrl} from "@src/utils";

export const getPhoneValidationResult = async (privateKey: string, params: Request): Promise<PhoneResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

export const postPhoneValidationResult = async (privateKey: string, params: Request): Promise<PhoneResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "POST", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    let phone;
    if (params.requestParameters && "phone" in params.requestParameters) {
        phone = params.requestParameters.phone;
    }
    if (!phone) {
        errors.push(ERRORS.MISSING_PHONE);
    }
    return errors;
}

export default {getPhoneValidationResult, postPhoneValidationResult};