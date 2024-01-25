import {DomainAge} from "@src/utils/request/interfaces";

export interface EmailParams {
    email: string,
    fast?: boolean,
    timeout?: number,
    suggest_domain?: boolean,
    strictness?: StrictnessRange,
    abuse_strictness?: StrictnessRange
}

type StrictnessRange = 0 | 1 | 2;

export interface EmailResponse {
    valid?: boolean,
    disposable?: boolean,
    timed_out?: boolean,
    deliverability?: string,
    catch_all?: boolean,
    leaked?: boolean,
    suspect?: boolean,
    smtp_score?: number,
    overall_score?: number,
    first_name?: string,
    common?: boolean,
    generic?: boolean,
    dns_valid?: boolean,
    honeypot?: boolean,
    spam_trap_score?: number,
    recent_abuse?: boolean,
    fraud_score?: number,
    frequent_complainer?: boolean,
    suggested_domain?: string,
    domain_velocity?: string,
    user_activity?: string,
    associated_names?: object,
    associated_phone_numbers?: object,
    first_seen?: FirstSeen,
    domain_age?: DomainAge,
    sanitized_email?: string,
    request_id?: string,
    success?: boolean,
    message?: string,
    errors?: string[]
}

interface FirstSeen {
    human?: string |  null,
    timestamp?: number,
    iso?: string,
}