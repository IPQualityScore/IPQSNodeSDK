/**
 * Integration Tests
 *
 * @group integration
 * @group leaked
 */
import {Request, ResponseXML} from "@src/utils/request/interfaces";
import {leakedReport} from "@src/index";
import {LeakedResponse} from "@src/leaked/interfaces";
const privateKey = <string>process.env.PRIVATE_KEY;

describe('Integration Tests for LeakedReport', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/json/leaked/email`;
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    type: 'email',
                    value: 'foo@google.com'
                }
            }
            await leakedReport(privateKey, params).get();
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
                },
                requestParameters: {
                    type: 'email',
                    value: 'web@google.com'
                }
            }
            const res: LeakedResponse = <LeakedResponse>await leakedReport(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res?.source?.length).toBeGreaterThan(0);
            expect(res?.found).toBe(true);
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a normal ip address with XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    type: 'email',
                    value: 'web@google.com'
                }
            }
            const res: ResponseXML = <ResponseXML>await leakedReport(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
    });
});