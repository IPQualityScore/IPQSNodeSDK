import {Request, ResponseFail, ResponseXML} from 'utils/request/interfaces';
import {CreditUsageResponse} from "account/interfaces";
import {EmailResponse} from "email/interfaces";
import {PhoneResponse} from "phone/interfaces";
import {ProxyDetectionAveragesResponse} from "proxyDetection/averages/interfaces";
import {postbackResponse} from "proxyDetection/postback/interfaces";
import {ProxyDetectionReportResponse} from "proxyDetection/report/interfaces";
import {ProxyDetectionResponse} from "proxyDetection/interfaces";
import {RequestListResponse} from "requests/interfaces";
import {UrlValidationResponse} from "url/interfaces";
import {LeakedParams} from "leaked/interfaces";

export interface Types {
    request: Request,
    response: CreditUsageResponse |
        EmailResponse |
        PhoneResponse |
        ProxyDetectionAveragesResponse |
        postbackResponse |
        ProxyDetectionReportResponse |
        ProxyDetectionResponse |
        RequestListResponse |
        UrlValidationResponse |
        LeakedParams |
        ResponseXML |
        ResponseFail
}