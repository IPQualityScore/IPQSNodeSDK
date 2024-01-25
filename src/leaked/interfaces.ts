export interface LeakedParams {
    type: TypeValues,
    value: string,
}

type TypeValues = "email" | "password" | "username";


export interface LeakedResponse {
    success?: string | boolean,
    message?: string,
    source?: string | string[],
    found?: boolean,
    request_id?: string
}