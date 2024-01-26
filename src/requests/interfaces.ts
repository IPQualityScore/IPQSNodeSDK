export interface RequestListParams {
    type?: TypeValues,
    page?: number,
    limit?: number,
    start_date?: string,
    stop_date?: string,
    tracker_id?: number,
    device_id?: string,
    min_fraud_score?: number,
    max_fraud_score?: number,
    ip_address?: string,
}

export interface RequestListUpdateParameters {
    transactionID?: string | number,
    userID?: string | number,
    subUserID?: string | number,
    campaignID?: string | number,
    subCampaignID?: string | number,
    publisherID?: string | number,
    gclid?: string | number,
    email?: string | number,
    clickID?: string | number,
    conversionID?: string | number,
}

type TypeValues = "proxy" | "email" | "phone" | "devicetracker" | "mobiletracker";

export interface RequestListResponse {
    success?: boolean,
    requests?: object[],
    current_page?: number,
    total_pages?: number,
    request_count?: number,
    max_results_per_page?: number,
    total_requests?: number,
    request_id?: number
}