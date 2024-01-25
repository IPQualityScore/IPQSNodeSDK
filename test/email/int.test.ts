/**
 * Integration Tests
 *
 * @group integration
 * @group emailValidation
 */
import {EmailResponse} from "@src/email/interfaces";
import {ResponseXML, Request} from "@src/utils/request/interfaces";
import {emailValidation} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for Email Validation', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = 'https://www.ipqualityscore.com/api/json/email';
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            await emailValidation(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a valid email address and other valid parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).get();
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
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).get();
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
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).post();
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
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).get();
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
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a valid email address and other valid parameters and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    email: "foo@google.com",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: ResponseXML = <ResponseXML>await emailValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
        it('should work with a valid email address and other valid parameters, but use POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    email: "foo@google.com",
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const res: EmailResponse = <EmailResponse>await emailValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Success.");
            expect(res.request_id).toBeTruthy();
        });
    });
})