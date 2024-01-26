import {getResult} from "@src/utils/request";
import {ERRORS, URL_PROP_NAME} from "./const";
import {AveragesParams, AveragesResponse} from "@src/averages/interfaces";
import {FilterObjectType} from "@src/utils/interfaces";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {disallowPKConfigs, validateDates} from "@src/utils";
import {BASE_URL} from "@src/utils/request/const";

export const getAveragesResult = async (privateKey: string, params: AveragesParams): Promise<AveragesResponse|ResponseXML|ResponseFail> => {
    const updatedParams: Request = {
        config: {
            exportType: "json"
        },
        requestParameters: params
    }
    return await getResult({type: "GET", privateKey, params: updatedParams, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (params: Request): string[] => {
    const errors: string[] = [];
    if(!validateDates(<FilterObjectType><unknown>params.requestParameters, ['start_date', 'end_date'])) {
        errors.push(ERRORS.INCORRECT_DATE_PARAMETERS);
    }
    if(!disallowPKConfigs(params)) {
        errors.push(ERRORS.PK_CONFIG_NOT_ALLOWED)
    }
    return errors;
}

export const whichUrl = (privateKey: string): string => {
    return `${BASE_URL}/${privateKey}/proxy/average`;
}

export default getAveragesResult;