/**
 * emailValidation Unit Tests
 *
 * @group unit
 * @group phoneValidation
 */
import module, {
    getPhoneValidationResult,
    postPhoneValidationResult
} from './index';
import {Request} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/phone/const";

jest.mock('@src/utils/request', () => ({
    postApiResult: jest.fn(),
    getApiResult: jest.fn()
}));

describe('Phone Validation', () => {
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
                        phone: "18007132618",
                    }
                }
                const result = await getPhoneValidationResult('privateKey', params);
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
                        phone: "18007132618",
                    }
                }
                const result = await postPhoneValidationResult('privateKey', params);
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
        it('should return an empty array when phone is provided', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    phone: "18007132618",
                }
            }
            const result = fn(params);
            expect(result).toEqual([]);
        });
        it('should return an array with the missing email error when phone is missing', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    phone: "",
                }
            }
            const expectedErrors = [ERRORS.MISSING_PHONE];
            const result = fn(params);
            expect(result).toEqual(expectedErrors);
        });
        it('should return an array with the missing email error if phone isnt even a property', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    "strictness": 1,
                }
            }
            const expectedErrors = [ERRORS.MISSING_PHONE];
            const result = fn(params);
            expect(result).toEqual(expectedErrors);
        });
    });
});
