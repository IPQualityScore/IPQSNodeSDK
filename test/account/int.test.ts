/**
 * Integration Tests
 *
 * @group integration
 * @group creditUsage
 */
import {Request, ResponseXML} from "@src/utils/request/interfaces";
import {creditUsage} from "@src/index";
import {CreditUsageResponse} from "@src/account/interfaces";
const privateKey = <string>process.env.PRIVATE_KEY;

describe('Integration Tests for CreditUsage', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/json/account`;
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                }
            }
            await creditUsage(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a normal ip address with JSON', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                }
            }
            const res: CreditUsageResponse = <CreditUsageResponse>await creditUsage(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBeTruthy();
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a normal ip address with XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                }
            }
            const res: ResponseXML = <ResponseXML>await creditUsage(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
    });
});