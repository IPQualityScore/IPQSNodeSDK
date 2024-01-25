/**
 * Integration Tests
 *
 * @group integration
 * @group phoneValidation
 */
import {PhoneResponse} from "@src/phone/interfaces";
import {ResponseXML, Request} from "@src/utils/request/interfaces";
import {phoneValidation} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for Phone Validation', () => {
    it('calls the correct URL', async () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
        const url = 'https://www.ipqualityscore.com/api/json/phone';
        const params: Request = {
            config: {
                exportType: 'json'
            },
            requestParameters: {
                phone: "18007132618",
            }
        }
        await phoneValidation(privateKey, params).get();
        const actualUrl = mockFetch.mock.calls[0][0];
        expect(actualUrl).toContain(url);
        mockFetch.mockRestore();
    });
    describe("Calling the API", () => {
        it('should work with a valid phone number and other valid parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a GET param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a POST param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using GET', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a valid phone number and other valid parameters and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: ResponseXML = <ResponseXML>await phoneValidation(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
        it('should work with a valid phone number and other valid parameters, but use POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const res: PhoneResponse = <PhoneResponse>await phoneValidation(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.message).toBe("Phone is valid.");
            expect(res.request_id).toBeTruthy();
        });
    });
});