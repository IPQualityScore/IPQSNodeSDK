import {Request, ResponseFail, ResponseXML} from '@src/utils/request/interfaces';
import {CreditUsageResponse} from "@src/account/interfaces";
import {EmailParams, EmailResponse} from "@src/email/interfaces";
import {PhoneParams, PhoneResponse} from "@src/phone/interfaces";
import {AveragesParams, AveragesResponse} from "@src/averages/interfaces";
import {PostbackUpdateParams, PostbackResponse} from "@src/postback/interfaces";
import {ReportParams, ReportResponse} from "@src/report/interfaces";
import {ProxyDetectionParams, ProxyDetectionResponse} from "@src/proxyDetection/interfaces";
import {RequestListParams, RequestListResponse} from "@src/requests/interfaces";
import {UrlParams, UrlValidationResponse} from "@src/url/interfaces";
import {LeakedParams, LeakedResponse} from "@src/leaked/interfaces";

export interface Types {
    request: Request,
    response: CreditUsageResponse |
        EmailResponse |
        PhoneResponse |
        AveragesResponse |
        PostbackResponse |
        ReportResponse |
        ProxyDetectionResponse |
        RequestListResponse |
        UrlValidationResponse |
        LeakedResponse |
        ResponseXML |
        ResponseFail
}