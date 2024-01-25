/**
 * Integration Tests
 *
 * @group integration
 * @group postback
 */
import {PostbackResponse} from "@src/postback/interfaces";
import {Request, ResponseXML} from "@src/utils/request/interfaces";
import {proxyDetection, postback} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;

let request_id = '';
describe('Integration Tests for postback', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/json/postback`;
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters: {
                    request_id
                },
                updateParameters: {
                    ClickDate: '2023-04-10',
                    ConversionDate: '2023-04-10',
                }
            }
            await postback(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            expect(actualUrl).toContain("update[ClickDate]");
            expect(actualUrl).toContain("update[ConversionDate]");
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        beforeAll(async ()=> {
            // This piggybacks off of the original ProxyDetection request
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: PostbackResponse = <PostbackResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.request_id).toBeTruthy();
            request_id = <string>res.request_id;
        })
        it('should work with a valid IP4 address and other valid parameters', async () => {
            const requestParams: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters: {
                    request_id
                },
                updateParameters: {
                    ClickDate: '2023-04-10',
                    ConversionDate: '2023-04-10',
                }
            }
            const postbackResponse: PostbackResponse = <PostbackResponse>await postback(privateKey, requestParams).get();
            expect(postbackResponse.success).toBe(true);
            expect(postbackResponse.country_code).toBeTruthy();
            expect(postbackResponse.request_id).toBeTruthy();
        });
        it('should work with a valid IP4 address and other valid parameters and return XML', async () => {
            const requestParams: Request = {
                config: {
                    exportType: 'xml',
                },
                requestParameters: {
                    request_id
                },
                updateParameters: {
                    ClickDate: '2023-04-10',
                    ConversionDate: '2023-04-10',
                }
            }
            const postbackResponse: ResponseXML = <ResponseXML>await postback(privateKey, requestParams).get();
            expect(postbackResponse.success).toBe(true);
            expect(postbackResponse.xml).toBeTruthy();
        });
    });
});