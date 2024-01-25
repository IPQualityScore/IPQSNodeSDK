/**
 * Integration Tests
 *
 * @group integration
 * @group report
 */
import {
    ReportResponse
} from "@src/report/interfaces";
import {Request, ResponseXML} from "@src/utils/request/interfaces";
import {report} from "@src/index";
const privateKey = <string>process.env.PRIVATE_KEY;

describe('Integration Tests for ProxyDetectionReport', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/json/report`;
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                }
            }
            await report(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a normal ip address', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                }
            }
            const res: ReportResponse = <ReportResponse>await report(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBeTruthy();
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a normal ip address and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                }
            }
            const res: ResponseXML = <ResponseXML>await report(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
    });
});