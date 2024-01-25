/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group creditUsage
 */

import module, {getCreditUsageResult} from "@src/account";
import {Request} from "@src/utils/request/interfaces";
import {URL_PROP_NAME, ERRORS} from "@src/account/const";
jest.mock('@src/utils/request');

describe('CreditUsage Report', () => {
    describe("GET wrapper function", () => {
        const expectedResult = { status: 'success' };
        const getResultMock = jest.fn(() => expectedResult);
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getResult', getResultMock);
        });
        describe('getCreditUsage()', () => {
            it('should call getResult with GET method', async () => {
                const params: Request = {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {}
                }
                const result = await getCreditUsageResult('privateKey', params);
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
        it('should return an empty array if params are otherwise valid', () => {
            const params: Request = {
                config: {
                    exportType: "json",
                }
            };
            const errors = fn(params);
            expect(errors.length).toBe(0);
        });
        it('should return false if pkAsGetOrPostParam or pkAsHeader is set', () => {
            const params: Request = {
                config: {
                    exportType: "json",
                    pkAsGetOrPostParam: true,
                }
            };
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
            const params: Request = {
                config: {
                    exportType: "json"
                },
                requestParameters: {}
            }
            const url = fn(privateKey, params, URL_PROP_NAME);
            expect(url).toEqual("https://www.ipqualityscore.com/api/json/account/privateKey");
        });
    });
});