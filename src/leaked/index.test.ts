/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group leaked
 */

import module, {getLeakedResults} from "@src/leaked/index";
import {Request} from "@src/utils/request/interfaces";
import {ERRORS} from "@src/leaked/const";
import {URL_PROP_NAME} from "@src/leaked/const";
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
                        type: "email",
                        value: "foo@google.com"
                    }
                }
                const result = await getLeakedResults('privateKey', params);
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
                type: 'email',
                value: 'value'
            };
            const params: Request = {
                config: {
                    exportType: 'json',
                },
                requestParameters
            }
            expect(fn(params)).toEqual([]);
        });
        it('should return false if type is not set', () => {
            const requestParameters = {};
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters
            };
            const errors = fn(params);
            expect(errors).toContain(ERRORS.INCORRECT_REQUEST_PARAMETERS);
        });
        it('should return false if pkAsGetOrPostParam or pkAsHeader is set', () => {
            const requestParameters = {};
            const params: Request = {
                config: {
                    exportType: "json",
                    pkAsGetOrPostParam: true,
                },
                requestParameters
            };
            const errors = fn(params);
            expect(errors).toContain(ERRORS.PK_CONFIG_NOT_ALLOWED);
        });
    });
    describe('validateRequestParams()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('validateRequestParams');
        it('should return true if the input object contains the "type" and "value" key', () => {
            const obj = { type: 'email', value: 'value' };
            const result = fn(obj);
            expect(result).toBe(true);
        });
        it('should return false if the input object does not contain either "type" or "value" keys', () => {
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
                requestParameters: {
                    type: "email",
                    value: "value"
                }
            }
            const url = fn(privateKey, params, URL_PROP_NAME);
            expect(url).toEqual("https://www.ipqualityscore.com/api/json/leaked/email/privateKey/value");
        });
    });
});