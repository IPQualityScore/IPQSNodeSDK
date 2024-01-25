/**
 * @group unit
 * @group postback
 */

import module, {getPostbackResult} from "@src/postback";
import {Request} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/postback/const";
jest.mock('@src/utils/request');

describe('postback', () => {
    describe("GET wrapper functions", () => {
        const expectedResult = { status: 'success' };
        const getResultMock = jest.fn(() => expectedResult);
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getResult', getResultMock);
        });
        describe('getPostbackResult()', () => {
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
                const result = await getPostbackResult('privateKey', params);
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
        afterEach(() => {
            jest.resetModules();
        });
    });
    describe('validateParams()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('validateParams');
        it('should return an empty array if both requestParams and updateParams are valid', () => {
            const requestParameters = {
                request_id: 'request_id',
            };
            const updateParameters = {
                language: 'language'
            };
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters,
                updateParameters,
            }
            expect(fn(params)).toEqual([]);
        });
        it('should return an array with one error message if requestParams are invalid', () => {
            const requestParameters = {};
            const updateParameters = {
                language: 'language'
            };
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters,
                updateParameters,
            }
            expect(fn(params)).toEqual([ERRORS.INCORRECT_REQUEST_PARAMETERS]);
        });
        it('should return an array with one error message if updateParams are invalid', () => {
            const requestParameters = {
                request_id: 'request_id',
            };
            const updateParameters = {
                ConversionDate: 'date'
            };
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters,
                updateParameters,
            }
            expect(fn(params)).toEqual([ERRORS.INCORRECT_DATE_PARAMETERS]);
        });
        it('should return an array with two error messages if both requestParams and updateParams are invalid', () => {
            const requestParameters = {};
            const updateParameters = {
                ConversionDate: 'date'
            };
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters,
                updateParameters,
            }
            expect(fn(params)).toEqual([ERRORS.INCORRECT_REQUEST_PARAMETERS, ERRORS.INCORRECT_DATE_PARAMETERS]);
        });
        it('should return false if pkAsGetOrPostParam or pkAsHeader is set', () => {
            const requestParameters = {};
            const updateParameters = {
                ConversionDate: 'date'
            };
            const params: Request = {
                config: {
                    exportType: "json",
                    pkAsGetOrPostParam: true,
                },
                requestParameters,
                updateParameters,
            };
            const errors = fn(params);
            expect(errors).toContain(ERRORS.PK_CONFIG_NOT_ALLOWED);
        });
    });
    describe('validateRequestParams()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('validateRequestParams');
        it('should return true if the input object contains the "request_id" key', () => {
            const obj = { request_id: '123' };
            const result = fn(obj);
            expect(result).toBe(true);
        });
        it('should return true if the input object contains the "type" key', () => {
            const obj = { type: 'my-type' };
            const result = fn(obj);
            expect(result).toBe(true);
        });
        it('should return false if the input object does not contain either "request_id" or "type" keys', () => {
            const obj = { other_key: 'value' };
            const result = fn(obj);
            expect(result).toBe(false);
        });
    });
    describe('whichUrl()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('whichUrl');
        it('should return the correct URL', () => {
            const privateKey = 'privateKey';
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters: {}
            }
            const url = fn(privateKey, params, URL_PROP_NAME);
            expect(url).toEqual("https://www.ipqualityscore.com/api/json/postback/privateKey/");
        });
    });
});