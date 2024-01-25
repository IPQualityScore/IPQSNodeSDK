export interface postback {
    request_id?: string,
    type?: string,
}

export interface PostbackUpdateParams {
    language?: string,
    user_agent?: string,
    ClickDate?: string,
    ConversionDate?: string,
    ConversionStatus?: boolean | string,
    TransactionID?: string | number,
    UserID?: string | number,
    subUserID?: string | number,
    campaignID?: string | number,
    subCampaignID?: string | number,
    publisherID?: string | number,
    gclid?: string | number,
    email?: string | number,
    clickID?: string | number,
    conversionID?: string | number,
}

export interface PostbackResponse {
    success: string | boolean,
    message?: string,
    fraud_score?: number,
    country_code?: string,
    region?: string,
    city?: string,
    ISP?: string,

    ASN?: number,
    organization?: string,
    is_crawler?: boolean,
    timezone?: string,
    mobile?: boolean,
    host?: string,
    proxy?: boolean,
    vpn?: boolean,
    tor?: boolean,
    active_vpn?: boolean,
    active_tor?: boolean,
    recent_abuse?: boolean,
    bot_status?: boolean,
    connection_type?: string,
    abuse_velocity?: string,
    zip_code?: string,
    latitude?: number,
    longitude?: number,
    request_id?: string
}