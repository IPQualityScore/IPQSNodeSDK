/**
 * Integration Tests
 *
 * @group integration
 * @group urlValidation
 */
import {EmailResponse} from "@src/email/interfaces";
import {ResponseXML, Request} from "@src/utils/request/interfaces";
import {urlValidation} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for Malicious URL Validation', () => {
    it('calls the correct URL', async () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
        const url = 'https://www.ipqualityscore.com/api/json/url';
        const params: Request = {
            config: {
                exportType: 'json'
            },
            requestParameters: {
                url: "http://www.google.com/",
            }
        }
        await urlValidation(privateKey, params).get();
        const actualUrl = mockFetch.mock.calls[0][0];
        expect(actualUrl).toContain(url);
        mockFetch.mockRestore();
    });
    describe("Calling the API", () => {
        it('should work with a valid url and other valid parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a GET param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a POST param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using GET', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a valid url and other valid parameters and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: ResponseXML = <ResponseXML>await urlValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
        it('should work with a valid url and other valid parameters, but use POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    url: "http://www.google.com/",
                }
            }
            const res: EmailResponse = <EmailResponse>await urlValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
    });
});