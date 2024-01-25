export interface CreditUsageResponse {
    success: string | boolean,
    message?: string,
    request_id?: string,
    credits?: number,
    usage?: number,
    proxy_usage?: number,
    email_usage?: number,
    fingerprint_usage?: number
}