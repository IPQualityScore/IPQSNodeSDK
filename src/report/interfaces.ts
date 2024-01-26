export interface ReportParams {
    ip: string,
}

export interface ReportResponse {
    success: string | boolean,
    message?: string,
    request_id?: string,
}