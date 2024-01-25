import {RequestListResponse} from "@src/requests/interfaces";
import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/requests/const";
import {validateDates, whichUrl} from "@src/utils";
import {FilterObjectType} from "@src/utils/interfaces";

export const getRequestListResult = async (privateKey: string, params: Request): Promise<RequestListResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

export const postRequestListResult = async (privateKey: string, params: Request): Promise<RequestListResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "POST", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    let type;
    if (params.requestParameters && "type" in params.requestParameters) {
        type = params.requestParameters.type;
    }
    if (!type) {
        errors.push(ERRORS.MISSING_TYPE);
    }
    if(!validateDates(<FilterObjectType><unknown>params.requestParameters, ['start_date', 'stop_date'])) {
        errors.push(ERRORS.INCORRECT_DATE_PARAMETERS);
    }
    return errors;
}

export default {getRequestListResult, postRequestListResult};