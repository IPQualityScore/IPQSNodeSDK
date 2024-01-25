//@TODO Some of these are really response interfaces are they not? Split them apart later?
import {DomainAge} from "@src/utils/request/interfaces";

export interface UrlParams {
    url?: string,
    strictness?: StrictnessRange,
    fast?: boolean,
    timeout?: number
}

type StrictnessRange = 0 | 1 | 2;

export interface UrlValidationResponse {
    success?: boolean,
    message?: string,
    errors?: string[]
    unsafe?: boolean,
    domain?: string,
    ip_address?: string,
    country_code?: string,
    language_code?: string,
    server?: string,
    content_type?: string,
    risk_score?: number,
    status_code?: number,
    page_size?: number,
    domain_rank?: number,
    dns_valid?: boolean,
    suspicious?: boolean,
    phishing?: boolean,
    malware?: boolean,
    parking?: boolean,
    spamming?: boolean,
    adult?: boolean,
    category?: string,
    domain_age?: DomainAge,
    redirected?: boolean,
    request_id?: string
}