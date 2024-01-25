//@TODO Do we ever want to have a check to ensure that POST is used if the get params are too long?
import {TransactionDetails} from "@src/utils/request/interfaces";

export interface PhoneParams {
    phone?: string,
    strictness?: StrictnessRange,
    country?: string
}

type StrictnessRange = 0 | 1 | 2;

export interface PhoneResponse {
    success?: boolean,
    message?: string,
    errors?: string[]
    formatted?: string,
    local_format?: string,
    valid?: boolean
    fraud_score?: number,
    recent_abuse?: boolean | null,
    VOIP?: boolean | null,
    prepaid?: boolean | null,
    risky?: boolean | null,
    active?: boolean | null,
    name?: string,
    carrier?: string,
    line_type?: string,
    country?: string,
    region?: string,
    city?: string,
    timezone?: string,
    zip_code?: string,
    dialing_code?: number,
    do_not_call?: boolean,
    leaked?: boolean,
    spammer?: boolean,
    active_status?: string,
    user_activity?: string,
    associated_email_addresses?: AssociatedEmailAddresses,
    transaction_details?: TransactionDetails,
    request_id?: string
}

interface AssociatedEmailAddresses {
    status?: string,
    emails?: string[]
}