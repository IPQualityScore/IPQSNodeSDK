/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group proxyDetection
 */
import module, {getProxyDetectionResult, postProxyDetectionResult} from '@src/proxyDetection/index';
import {Request} from "@src/utils/request/interfaces";
import {URL_PROP_NAME} from "@src/proxyDetection/const";
jest.mock('@src/utils/request');

jest.mock('@src/utils/request', () => ({
    postApiResult: jest.fn(),
    getApiResult: jest.fn()
}));

describe('ProxyDetection', () => {
    describe("GET and POST wrapper functions", () => {
        const expectedResult = { status: 'success' };
        const getResultMock = jest.fn(() => expectedResult);
        beforeEach(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getResult', getResultMock);
        });
        describe('getProxyDetectionResult()', () => {
            it('should call getResult with GET method', async () => {
                const params: Request = {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        "ip": "192.168.0.1",
                        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
                        "language": "en-US,en;q=0.9",
                        "strictness": 1,
                        "lighter_penalties": true,
                    }
                }
                const result = await getProxyDetectionResult('privateKey', params);
                expect(result).toEqual(expectedResult);
                expect(getResultMock).toHaveBeenCalledWith(expect.objectContaining(
                    {
                        type: 'GET',
                        privateKey: 'privateKey',
                        params,
                        urlPropName: URL_PROP_NAME
                    }
                ));
            });
        });
        describe('postProxyDetectionResult()', () => {
            it('should call getResult with POST method', async () => {
                const params: Request = {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        "ip": "192.168.0.1",
                        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
                        "language": "en-US,en;q=0.9",
                        "strictness": 1,
                        "lighter_penalties": true,
                    }
                }
                const result = await postProxyDetectionResult('privateKey', params);
                expect(result).toEqual(expectedResult);
                expect(getResultMock).toHaveBeenCalledWith(expect.objectContaining(
                    {
                        type: 'POST',
                        privateKey: 'privateKey',
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
        it('should return an empty array regardless', () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    "ip": "192.168.0.1",
                    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36",
                    "language": "en-US,en;q=0.9",
                    "strictness": 1,
                    "lighter_penalties": true,
                }
            }
            const result = fn(params);
            expect(result).toEqual([]);
        });
    });
});
