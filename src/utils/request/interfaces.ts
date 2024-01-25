import {EmailParams} from "@src/email/interfaces";
import {ProxyDetection} from "@src/proxyDetection/interfaces";
import {
    postback,
    PostbackUpdateParams
} from "@src/postback/interfaces";
import {Report} from "@src/report/interfaces";
import {PhoneParams} from "@src/phone/interfaces";
import {UrlParams} from "@src/url/interfaces";
import {RequestList, RequestListUpdateParameters} from "@src/requests/interfaces";
import {Averages} from "@src/averages/interfaces";
import {LeakedParams} from "@src/leaked/interfaces";

export interface ApiRequestInterface {
    url: string,
    privateKey: string,
    exportType: string,
    params?: object,
    headers?: object
}

export interface FetchConfigInterface {
    method: string,
    body?: object,
    headers?: object | void,
}


export interface Request {
    config: Config,
    requestParameters?: EmailParams |
        PhoneParams|
        UrlParams |
        RequestList |
        ProxyDetection |
        Averages |
        postback |
        Report |
        LeakedParams,
    updateParameters?: PostbackUpdateParams | RequestListUpdateParameters,
}

interface Config {
    exportType: ExportTypes,
    pkAsGetOrPostParam?: boolean,
    pkAsHeader?: boolean,
}

type ExportTypes = "json" | "xml";

export interface GetResultParams {
    type: string,
    privateKey: string,
    params: Request,
    validateFn: { (params: Request): string[]},
    urlFn: { (privateKey: string, params: Request, urlPropName: string): string},
    urlPropName: string
}

export interface ResponseXML {
    success: boolean
    xml: string
}

export interface ResponseFail {
    success: boolean,
    errorMessage: string,
}

export interface TransactionDetails {
    risk_score?: number,
    risk_factors?: string,
    valid_billing_address?: boolean,
    valid_shipping_address?: boolean,
    valid_billing_email?: boolean,
    valid_shipping_email?: boolean,
    leaked_billing_email?: boolean,
    leaked_shipping_email?: boolean,
    leaked_user_data?: boolean,
    user_activity?: string,
    risky_billing_phone?: boolean,
    risky_shipping_phone?: boolean,
    valid_billing_phone?: boolean,
    valid_shipping_phone?: boolean,
    billing_phone_carrier?: string,
    shipping_phone_carrier?: string,
    billing_phone_line_type?: string,
    shipping_phone_line_type?: string,
    billing_phone_country?: string,
    shipping_phone_country?: string,
    billing_phone_country_code?: number,
    shipping_phone_country_code?: number,
    bin_country?: string,
    bin_bank_name?: string,
    bin_type?: string,
    risky_username?: boolean,
    is_prepaid_card?: boolean,
    fraudulent_behavior?: boolean,
    phone_name_identity_match?: string,
    phone_email_identity_match?: string,
    phone_address_identity_match?: string,
    email_name_identity_match?: string,
    name_address_identity_match?: string,
    address_email_identity_match?: string,
}

export interface DomainAge {
    human?: string |  null,
    timestamp?: number,
    iso?: string,
}