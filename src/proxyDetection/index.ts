import {getResult} from "@src/utils/request";
import {Request, ResponseFail, ResponseXML} from "@src/utils/request/interfaces";
import {ProxyDetectionResponse} from "@src/proxyDetection/interfaces";
import {URL_PROP_NAME} from "@src/proxyDetection/const";
import {whichUrl} from "@src/utils";

export const getProxyDetectionResult = async (privateKey: string, params: Request): Promise<ProxyDetectionResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "GET", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

export const postProxyDetectionResult = async (privateKey: string, params: Request): Promise<ProxyDetectionResponse|ResponseXML|ResponseFail> => {
    return await getResult({type: "POST", privateKey, params, validateFn: validateParams, urlFn: whichUrl, urlPropName: URL_PROP_NAME});
}

const validateParams = (): string[] => {
    const errors: string[] = [];
    return errors;
}

export default {getProxyDetectionResult, postProxyDetectionResult};