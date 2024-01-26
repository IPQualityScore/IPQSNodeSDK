import {TransactionDetails} from "@src/utils/request/interfaces";

export interface ProxyDetectionParams extends ProxyDetectionParamsBase, TransactionScoringResponse, PhoneReputation {}
interface ProxyDetectionParamsBase {
    ip: string,
    user_agent?: string,
    language?: string,
    user_language?: string,
    strictness?: StrictnessRange,
    lighter_penalties?: boolean,
    fast?: boolean,
    mobile?: boolean,
    allow_public_access_points?: boolean,
    transaction_strictness?: TransactionStrictnessRange,
}

interface TransactionScoringResponse {
    billing_first_name?: string;
    billing_last_name?: string;
    billing_company?: string;
    billing_country?: string;
    billing_address_1?: string;
    billing_address_2?: string;
    billing_city?: string;
    billing_region?: string;
    billing_postcode?: string;
    billing_email?: string;
    billing_phone?: string;
    shipping_first_name?: string;
    shipping_last_name?: string;
    shipping_company?: string;
    shipping_country?: string;
    shipping_address_1?: string;
    shipping_address_2?: string;
    shipping_city?: string;
    shipping_region?: string;
    shipping_postcode?: string;
    shipping_email?: string;
    shipping_phone?: string;
    username?: string;
    password_hash?: string,
    credit_card_bin?: number,
    credit_card_hash?: string,
    credit_card_expiration_month?: number,
    credit_card_expiration_year?: number,
    avs_code?: string,
    cvv_code?: string,
    order_amount?: number,
    order_quantity?: number
    recurring?: number;
    recurring_times?: number;
}

interface PhoneReputation {
    billing_country?: string;
    billing_phone?: string;
    billing_phone_country_code?: string;
    shipping_country?: string;
    shipping_phone_country_code?: string;
    shipping_phone?: string;
}

type StrictnessRange = 0 | 1 | 2 | 3;
type TransactionStrictnessRange = 0 | 1 | 2;
export interface ProxyDetectionResponse {
    success: string | boolean,
    message: string,
    request_id: string,
    errors?: string[],
    proxy?: boolean,
    host?: string,
    ISP?: string,
    Organization?: string,
    ASN?: number,
    country_code?: string,
    city?: string,
    region?: string,
    timezone?: string,
    latitude?: number,
    longitude?: number,
    zip_code?: string,
    is_crawler?: boolean,
    connection_type?: string,
    recent_abuse?: boolean,
    abuse_velocity?: string,
    bot_status?: boolean,
    vpn?: boolean,
    tor?: boolean,
    active_vpn?: boolean,
    active_tor?: boolean,
    mobile?: boolean,
    fraud_score?: number,
    operating_system?: string,
    browser?: string,
    device_brand?: string,
    device_model?: string,
    transaction_details?: TransactionDetails,
}