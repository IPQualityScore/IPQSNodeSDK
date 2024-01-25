import {getProxyDetectionResult} from "@src/proxyDetection";
import {Request} from "@src/utils/request/interfaces";
import getAveragesResult from "@src/averages";
import {Averages} from "@src/averages/interfaces";
import getPostbackResult from "@src/postback";
import getReportResult from "@src/report";
import {getEmailValidationResult, postEmailValidationResult} from "@src/email";
import {getPhoneValidationResult, postPhoneValidationResult} from "@src/phone";
import {getMaliciousUrlResult, postMaliciousUrlResult} from "@src/url";
import {getRequestListResult, postRequestListResult} from "@src/requests";
import getCreditUsageResult from "@src/account";
import getLeakedResults from "@src/leaked";

//@TODO Still not sure what I want to do with this but this could work? I want to test it out further.
export const proxyDetection = (privateKey: string, params: Request) => {
    return {
        get: () => getProxyDetectionResult(privateKey, params),
        post: () => getProxyDetectionResult(privateKey, params),
    }
}

export const averages = (privateKey: string, params: Averages) => {
    return {
        get: () => getAveragesResult(privateKey, params)
    }
}

export const postback = (privateKey: string, params: Request) => {
    return {
        get: () => getPostbackResult(privateKey, params)
    }
}

export const report = (privateKey: string, params: Request) => {
    return {
        get: () => getReportResult(privateKey, params)
    }
}

export const emailValidation = (privateKey: string, params: Request) => {
    return {
        get: () => getEmailValidationResult(privateKey, params),
        post: () => postEmailValidationResult(privateKey, params),
    }
}

export const phoneValidation = (privateKey: string, params: Request) => {
    return {
        get: () => getPhoneValidationResult(privateKey, params),
        post: () => postPhoneValidationResult(privateKey, params),
    }
}

export const urlValidation = (privateKey: string, params: Request) => {
    return {
        get: () => getMaliciousUrlResult(privateKey, params),
        post: () => postMaliciousUrlResult(privateKey, params),
    }
}

export const requestLists = (privateKey: string, params: Request) => {
    return {
        get: () => getRequestListResult(privateKey, params),
        post: () => postRequestListResult(privateKey, params),
    }
}

export const creditUsage = (privateKey: string, params: Request) => {
    return {
        get: () => getCreditUsageResult(privateKey, params),
    }
}

export const leakedReport = (privateKey: string, params: Request) => {
    return {
        get: () => getLeakedResults(privateKey, params),
    }
}


export default {
    proxyDetection,
    averages,
    postback,
    report,
    emailValidation,
    phoneValidation,
    urlValidation,
    requestLists,
    creditUsage,
    leakedReport
};