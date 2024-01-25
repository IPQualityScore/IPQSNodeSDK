import {to} from "await-to-js";
import {ApiRequestInterface, FetchConfigInterface, GetResultParams} from "@src/utils/request/interfaces";
import {ERRORS} from "@src/utils/request/const";
import {
    serializeParams,
    getPKHeader,
    sanitizeExportType,
    updateParamsToOptionallyAddPK,
    generateUpdatePostParams
} from "@src/utils";
import {RequestListUpdateParameters} from "@src/requests/interfaces";

export const postApiResult = async (config: ApiRequestInterface) => {
    const {url, privateKey, exportType, params ,headers} = config;
    if (!privateKey || !params) return {
        success: false,
        errorMessage: ERRORS.PRIVATE_KEY_OR_PARAMS_MISSING
    };
    const fetchConfig: FetchConfigInterface = {
        method: 'POST',
        body: getFormData(<Record<string, unknown>>params),
    }
    fetchConfig.headers = getHeaders(<Record<string, unknown>>headers || {});
    return await fetchRequest(url, exportType, fetchConfig);
}

export const getApiResult = async (config: ApiRequestInterface) => {
    const {url, privateKey, exportType, params ,headers} = config;
    const fullUrl = [url, serializeParams(params || {})].join('?');
    if (!privateKey) return {
        success: false,
        errorMessage: ERRORS.PRIVATE_KEY_MISSING
    };
    const fetchConfig: FetchConfigInterface = {
        method: 'GET',
    }
    fetchConfig.headers = getHeaders(<Record<string, unknown>>headers || {});
    return await fetchRequest(fullUrl, exportType, fetchConfig);
}

function getFormData<T extends Record<string, unknown>>(object: T) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
        const value = object[key];
        formData.append(key, String(value));
    });
    return formData;
}

function getHeaders<T extends Record<string, unknown>>(object: T) {
    const headers = new Headers();
    Object.keys(object).forEach(key => {
        const value = object[key];
        headers.append(key, String(value));
    });
    return headers;
}

const fetchRequest = async(url: string, exportType: string, fetchConfig: FetchConfigInterface ) => {
    const [error, res] = await to(fetch(url, <RequestInit>fetchConfig));
    if (error) {
        return {
            success: false,
            errorMessage: error.toString()
        }
    } else {
        if(res.status == 200) {
            switch(exportType) {
                case 'json':
                    return await res.json();
                default:    // XML
                    return {
                        success: true,
                        xml: await res.text()
                    }
            }
        } else {
            return {
                success: false,
                errorMessage: await res.text()
            }
        }
    }
}

export const getResult = async (getResultParams: GetResultParams) => {
    const {type, privateKey, params, validateFn, urlFn, urlPropName} = getResultParams
    const {updateParameters} = params;
    const errors = validateFn(params);
    if(errors.length > 0) {
        return {
            success: false,
            errorMessage: errors.join(' ')
        }
    }

    const url = urlFn(privateKey, params, urlPropName);
    let updatedRequestParams = {};
    if (urlPropName !== 'account' && urlPropName !== 'leaked') {
        updatedRequestParams = updateParamsToOptionallyAddPK(params, privateKey, urlPropName);
        if (updateParameters) {
            const updatedUpdateParams = generateUpdatePostParams(<RequestListUpdateParameters>updateParameters);
            updatedRequestParams = { ...updatedRequestParams, ...updatedUpdateParams};
        }
    }
    const headers = getPKHeader(params, privateKey);
    const exportType = sanitizeExportType(params?.config?.exportType);

    const configParams: ApiRequestInterface = {url, privateKey, exportType, params: updatedRequestParams, headers};
    if (type === "POST") {
        return postApiResult(configParams);
    } else if (type === "GET") {
        return getApiResult(configParams);
    } else {
        return;
    }
}

export default {postApiResult, getApiResult}