/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group averages
 */

import module, {getAveragesResult} from "@src/averages/index";
import {
    AveragesParams
} from "@src/averages/interfaces";
import {Request} from "@src/utils/request/interfaces";
import {ERRORS, URL_PROP_NAME} from "@src/averages/const";
jest.mock('@src/utils/request');

describe('ProxyDetectionAverages', () => {
    describe("GET and POST wrapper functions", () => {
        const expectedResult = { status: 'success' };
        const getResultMock = jest.fn(() => expectedResult);
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getResult', getResultMock);
        });
        describe('getProxyDetectionAveragesResult()', () => {
            it('should call getResult with GET method', async () => {
                const params: AveragesParams = {
                    country: 'all',
                    start_date: '2000-01-01',
                    end_date: '2000-01-01',
                }
                const updatedParams: Request = {
                    config: {
                        exportType: "json"
                    },
                    requestParameters: params
                }
                const result = await getAveragesResult('privateKey', params);
                expect(result).toEqual(expectedResult);
                expect(getResultMock).toHaveBeenCalledWith(expect.objectContaining(
                    {
                        type: 'GET',
                        privateKey:'privateKey',
                        params: updatedParams,
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
        it('should return an empty array when all parameters are valid', () => {
            const validParams = {
                start_date: '2021-01-01',
                end_date: '2021-01-01'
            };
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters: validParams
            }
            const errors = fn(params);
            expect(errors).toEqual([]);
        });
        it('should return an array with an error when the date parameters are incorrect', () => {
            const invalidParams = {
                start_date: 'foo',
                end_date: 'bar'
            };
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters: invalidParams
            }
            const errors = fn(params);
            expect(errors).toContain(ERRORS.INCORRECT_DATE_PARAMETERS);
        });
        it('should return false if pkAsGetOrPostParam or pkAsHeader is set', () => {
            const invalidParams = {
                start_date: 'foo',
                end_date: 'bar'
            };
            const params: Request = {
                config: {
                    exportType: "json",
                    pkAsGetOrPostParam: true,
                },
                requestParameters: invalidParams
            }
            const errors = fn(params);
            expect(errors).toContain(ERRORS.PK_CONFIG_NOT_ALLOWED);
        });
    });
    describe('whichUrl()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('whichUrl');
        it('should return the correct URL', () => {
            const privateKey = 'privateKey';
            const validParams = {
                start_date: '2021-01-01',
                end_date: '2021-01-01'
            };
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters: validParams
            }
            const url = fn(privateKey, params, URL_PROP_NAME);
            expect(url).toEqual("https://www.ipqualityscore.com/api/privateKey/proxy/average");
        });
    });
});