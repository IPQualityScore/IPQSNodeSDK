/**
 * emailValidation Unit Tests
 *
 * @group unit
 * @group emailValidation
 */
import module, { getEmailValidationResult, postEmailValidationResult } from '@src/email/index';
import {Request} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/email/const";

jest.mock('@src/utils/request', () => ({
    postApiResult: jest.fn(),
    getApiResult: jest.fn()
}));

describe('Email Validation', () => {
    describe("GET and POST wrapper functions", () => {
        const expectedResult = { status: 'success' };
        const getResultMock = jest.fn(() => expectedResult);
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getResult', getResultMock);
        });
        describe('getEmailValidationResult()', () => {
            it('should call getResult with GET method', async () => {
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
                const result = await getEmailValidationResult('privateKey', params);
                expect(result).toEqual(expectedResult);
                expect(getResultMock).toHaveBeenCalledWith(expect.objectContaining(
                    {
                        type: 'GET',
                        privateKey:'privateKey',
                        params,
                        urlPropName: URL_PROP_NAME
                    }
                ));
            });
        });
        describe('postEmailValidationResult()', () => {
            it('should call getResult with POST method', async () => {
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
                const result = await postEmailValidationResult('privateKey', params);
                expect(result).toEqual(expectedResult);
                expect(getResultMock).toHaveBeenCalledWith(expect.objectContaining(
                    {
                        type: 'POST',
                        privateKey:'privateKey',
                        params,
                        urlPropName: URL_PROP_NAME
                    }
                ));
            });
        });
        afterEach(() => {
            jest.resetModules();
        });
    });
    describe('validateParams()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('validateParams');
        it('should return an empty array when email is provided', () => {
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
            const result = fn(params);
            expect(result).toEqual([]);
        });
        it('should return an array with the missing email error when email is missing', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    email: "",
                    fast: true,
                    timeout: 1,
                    suggest_domain: true,
                }
            }
            const expectedErrors = [ERRORS.MISSING_EMAIL];
            const result = fn(params);
            expect(result).toEqual(expectedErrors);
        });
        it('should return an array with the missing email error if email isnt even a property', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    "ip": "192.168.0.1",
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
                    "language": "en-US,en;q=0.9",
                }
            }
            const expectedErrors = [ERRORS.MISSING_EMAIL];
            const result = fn(params);
            expect(result).toEqual(expectedErrors);
        });
    });
});
