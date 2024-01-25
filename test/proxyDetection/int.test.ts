/**
 * Integration Tests
 *
 * @group integration
 * @group proxyDetection
 */
import {Request, ResponseXML} from '@src/utils/request/interfaces';
import {ProxyDetectionResponse} from '@src/proxyDetection/interfaces';
import {proxyDetection} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for ProxyDetection', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/json/ip`;
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            await proxyDetection(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a valid IP4 address and other valid parameters', async () => {
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
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
        });
        it('should work with a valid IP4 address and other valid parameters with pkAsGetOrPostParam as true', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
        });
        it('should work with a valid IP4 address and other valid parameters with pkAsHeader as true', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
        });
        it('should work with a valid IP4 address and other valid parameters using POST', async () => {
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
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
        });
        it('should work with a valid IP4 address and with a billing transaction', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    strictness: 1,
                    billing_email: "myemail@example.com"
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
            expect(res.transaction_details).toBeTruthy();
            expect(res?.transaction_details?.risk_score).toBeTruthy();
        });
        it('should work with a valid IP4 address and with a phone transaction', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    // strictness: 1,
                    billing_phone: "5555555555"
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
            expect(res.transaction_details).toBeTruthy();
            expect(res?.transaction_details?.billing_phone_country_code).toBe('55');
        });
        it('should work with a valid IP4 address and other valid parameters and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    ip: '8.8.8.8',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ResponseXML = <ResponseXML>await proxyDetection(privateKey, params).get();
            expect(res.xml).toBeTruthy();
        });
        it('should work with a valid IP6 address and other valid parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '0000:0000:0000:0000:0000:ffff:0808:0808',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success");
            expect(res.ISP).toBe("Google");
        });
        it('should return some success=false response if there is an invalid ip address', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: '',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(false);
            expect(res.message).toBe("");
        });
        it('should return some success=false response if the ip address is not an ip address', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    ip: 'potato',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
                    language: 'en;q=0.8',
                    strictness: 1,
                    lighter_penalties: false
                }
            }
            const res: ProxyDetectionResponse = <ProxyDetectionResponse>await proxyDetection(privateKey, params).get();
            expect(res.success).toBe(false);
            expect(res.message).toBeTruthy();
        });
    });
});