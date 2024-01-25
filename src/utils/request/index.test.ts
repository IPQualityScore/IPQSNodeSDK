/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group request
 */

import module, {postApiResult, getApiResult, getResult} from "@src/utils/request/index";
import {ApiRequestInterface, GetResultParams, ResponseFail} from "@src/utils/request/interfaces";
import {ERRORS} from "@src/utils/request/const";
jest.mock('@src/utils');
import * as util from '@src/utils';
import {generateUpdatePostParams, updateParamsToOptionallyAddPK, whichUrl} from "@src/utils";
import {RequestListUpdateParameters} from "@src/requests/interfaces";

const fetch = global.fetch;
describe('getApiResultPost', () => {
    describe('postApiResult()', () => {
        beforeEach(() => {
            global.fetch = fetch;   // Reset the mock
        });
        it('should return an error message if privateKey is missing', async () => {
            const config: ApiRequestInterface = {
                url: 'https://example.com',
                exportType: 'json',
                privateKey: '',
                params: { "foo": "bar"},
            };
            const result = await postApiResult(config);
            expect(result).toEqual({
                success: false,
                errorMessage: ERRORS.PRIVATE_KEY_OR_PARAMS_MISSING,
            });
        });
        it('should return an error message if params are missing', async () => {
            const config: ApiRequestInterface = {
                url: 'https://example.com',
                exportType: 'json',
                privateKey: '123456',
            };
            const result = await postApiResult(config);
            expect(result).toEqual({
                success: false,
                errorMessage: ERRORS.PRIVATE_KEY_OR_PARAMS_MISSING,
            });
        });
        it('should return an error message if params are missing', async () => {
            const config: ApiRequestInterface = {
                url: 'https://example.com',
                exportType: 'json',
                privateKey: '123456',
                params: { "foo": "bar"},
            };
            const mockedResponse = {
                "success": true,
                "ipAddress": "192.168.0.1",
            };
            const mockResponse = {
                status: 200,
                json: jest.fn().mockResolvedValue(mockedResponse),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);
            const result = await postApiResult(config);
            expect(result).toEqual(mockedResponse);
        });
    });
    describe('getApiResult()', () => {
        beforeEach(() => {
            global.fetch = fetch;   // Reset the mock
        });
        it('should return an error message if privateKey is missing', async () => {
            const config: ApiRequestInterface = {
                url: 'https://example.com',
                exportType: 'json',
                privateKey: '',
            };
            const result = await getApiResult(config);
            expect(result).toEqual({
                success: false,
                errorMessage: ERRORS.PRIVATE_KEY_MISSING,
            });
        });
        it('should return an error message if params are missing', async () => {
            const config: ApiRequestInterface = {
                url: 'https://example.com',
                exportType: 'json',
                privateKey: '123456',
            };
            const mockedResponse = {
                "success": true,
                "ipAddress": "192.168.0.1",
            };
            const mockResponse = {
                status: 200,
                json: jest.fn().mockResolvedValue(mockedResponse),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);
            const result = await getApiResult(config);
            expect(result).toEqual(mockedResponse);
        });
    });
    describe('fetchRequest()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('fetchRequest')
        beforeEach(() => {
            global.fetch = fetch;   // Reset the mock
        });
        it('returns a successful response with JSON data', async () => {
            const url = "url";
            const exportType = "json";
            const fetchConfig = {
                method: 'get'
            }
            const mockedResponse = {
                "success": true,
                "ipAddress": "192.168.0.1",
            };
            const mockResponse = {
                status: 200,
                json: jest.fn().mockResolvedValue(mockedResponse),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);
            const result = await fn(url, exportType, fetchConfig);
            expect(result).toEqual(mockedResponse);
        });
        it('returns a successful response with XML data', async () => {
            const url = "url";
            const exportType = "xml";
            const fetchConfig = {
                method: 'get'
            }
            const xmlString = "xmlString";
            const mockResponse = {
                status: 200,
                text: jest.fn().mockResolvedValue(xmlString),
            };
            const expectedResponse = {
                "success": true,
                "xml": xmlString,
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);
            const result = await fn(url, exportType, fetchConfig);
            expect(result).toEqual(expectedResponse);
        });
        it('returns an error response when the status code is not 200', async () => {
            const url = 'url';
            const exportType = 'json';
            const fetchConfig = {
                method: 'get'
            }
            const notFoundString = '404 not found';
            const expectedResponse = { success: false, errorMessage: `${notFoundString}` };
            const mockResponse = {
                status: 404,
                text: jest.fn().mockResolvedValue(notFoundString),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);
            const result = await fn(url, exportType, fetchConfig);
            expect(result).toEqual(expectedResponse);
        });
        it('returns an error response when there is an error', async () => {
            const url = 'url';
            const exportType = 'json';
            const fetchConfig = {
                method: 'get'
            }
            const errMessage = 'Error message';
            const expectedResponse: ResponseFail = { success: false, errorMessage: `Error: ${errMessage}` };
            global.fetch = jest.fn().mockRejectedValue(new Error(errMessage));
            const result = await fn(url, exportType, fetchConfig);
            expect(result).toEqual(expectedResponse);
        });
    });
    describe('getFormData()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('getFormData')
        it('Should return a FormData object', () => {
            const formData = {
                "foo": "foo",
                "bar": 123,
                "boolean": false
            }
            const result = fn(formData);
            const expected = new FormData();
            expected.append("foo", "foo");
            expected.append("bar", "123");
            expected.append("boolean", "false");
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getHeaders()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fn = module.__get__('getHeaders')
        it('Should return a Headers object', () => {
            const formData = {
                "foo": "foo",
                "bar": 123,
                "boolean": false
            }
            const result = fn(formData);
            const expected = new Headers();
            expected.append("foo", "foo");
            expected.append("bar", "123");
            expected.append("boolean", "false");
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getResult()', () => {
        beforeEach(() => {
            jest.mock('@src/utils', () => ({
                buildGetParams: jest.fn().mockReturnValue({}),
                getPKHeader: jest.fn().mockReturnValue({}),
                sanitizeExportType: jest.fn((exportType: string) => `mocked-${exportType}`),
                updateParamsToOptionallyAddPK: jest.fn().mockReturnValue({}),
                whichUrl: jest.fn().mockReturnValue('mocked-url')
            }));

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('postApiResult', jest.fn().mockResolvedValue('mocked-post-result'))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            module.__set__('getApiResult', jest.fn().mockResolvedValue('mocked-get-result'))
        });
        afterEach(() => {
            jest.clearAllMocks();
            jest.resetModules();
        });
        it('should return an error message when validation fails', async () => {
            const getResultParams: GetResultParams = {
                type: 'POST',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue(['error1', 'error2']),
                urlFn: whichUrl,
                urlPropName: 'mocked-url-prop'
            };

            const result = await getResult(getResultParams);

            expect(result).toEqual({
                success: false,
                errorMessage: 'error1 error2'
            });
            expect(getResultParams.validateFn).toHaveBeenCalledWith(getResultParams.params);
            expect(util.whichUrl).not.toHaveBeenCalled();
            expect(util.updateParamsToOptionallyAddPK).not.toHaveBeenCalled();
            expect(util.getPKHeader).not.toHaveBeenCalled();
            expect(util.sanitizeExportType).not.toHaveBeenCalled();
            expect(postApiResult).not.toHaveBeenCalled();
            expect(getApiResult).not.toHaveBeenCalled();
        });
        it('should call postApiResult when type is "POST"', async () => {
            const expectedResult = 'mocked-post-result';
            const getResultParams: GetResultParams = {
                type: 'POST',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue([]),
                urlFn: whichUrl,
                urlPropName: 'mocked-url-prop'
            };
            (util.whichUrl as jest.MockedFunction<typeof util.whichUrl>).mockReturnValue('mocked-url');
            (util.updateParamsToOptionallyAddPK as jest.MockedFunction<typeof util.updateParamsToOptionallyAddPK>).mockReturnValue(<never>{ email: "email"});
            (util.getPKHeader as jest.MockedFunction<typeof util.getPKHeader>).mockReturnValue({});
            (util.sanitizeExportType as jest.MockedFunction<typeof util.sanitizeExportType>).mockReturnValue('mocked-export-type');
            (postApiResult as jest.MockedFunction<typeof postApiResult>).mockResolvedValue(expectedResult);

            const result = await getResult(getResultParams);

            expect(result).toBe(expectedResult);
            expect(util.whichUrl).toHaveBeenCalledWith(
                getResultParams.privateKey,
                getResultParams.params,
                getResultParams.urlPropName
            );
            expect(util.updateParamsToOptionallyAddPK).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey,
                getResultParams.urlPropName
            );
            expect(util.getPKHeader).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey
            );
            expect(util.sanitizeExportType).toHaveBeenCalledWith(
                getResultParams.params?.config?.exportType
            );
            expect(postApiResult).toHaveBeenCalledWith({
                url: 'mocked-url',
                privateKey: getResultParams.privateKey,
                exportType: 'mocked-export-type',
                params: { email: "email"},
                headers: {}
            });
            expect(getApiResult).not.toHaveBeenCalled();
        });
        it('should call postApiResult when type is "POST" and with updateParameters', async () => {
            const expectedResult = 'mocked-post-result';
            const getResultParams: GetResultParams = {
                type: 'POST',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "email"
                    },
                    updateParameters: {
                        ConversionDate: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue([]),
                urlFn: whichUrl,
                urlPropName: 'mocked-url-prop'
            };
            (util.whichUrl as jest.MockedFunction<typeof util.whichUrl>).mockReturnValue('mocked-url');
            (util.updateParamsToOptionallyAddPK as jest.MockedFunction<typeof util.updateParamsToOptionallyAddPK>).mockReturnValue(<never>{ email: "email"});
            (util.getPKHeader as jest.MockedFunction<typeof util.getPKHeader>).mockReturnValue({});
            (util.sanitizeExportType as jest.MockedFunction<typeof util.sanitizeExportType>).mockReturnValue('mocked-export-type');
            (postApiResult as jest.MockedFunction<typeof postApiResult>).mockResolvedValue(expectedResult);

            const result = await getResult(getResultParams);

            const updatedUpdateParams = generateUpdatePostParams(<RequestListUpdateParameters>getResultParams.params.updateParameters);
            const updatedRequestParams = <never>{ ...getResultParams.params.requestParameters, ...updatedUpdateParams}

            expect(result).toBe(expectedResult);
            expect(util.whichUrl).toHaveBeenCalledWith(
                getResultParams.privateKey,
                getResultParams.params,
                getResultParams.urlPropName
            );
            expect(util.updateParamsToOptionallyAddPK).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey,
                getResultParams.urlPropName
            );
            expect(util.getPKHeader).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey
            );
            expect(util.sanitizeExportType).toHaveBeenCalledWith(
                getResultParams.params?.config?.exportType
            );
            expect(postApiResult).toHaveBeenCalledWith({
                url: 'mocked-url',
                privateKey: getResultParams.privateKey,
                exportType: 'mocked-export-type',
                params: updatedRequestParams,
                headers: {}
            });
            expect(getApiResult).not.toHaveBeenCalled();
        });
        it('should call getApiResult when type is "GET"', async () => {
            const expectedResult = 'mocked-get-result';
            const getResultParams: GetResultParams = {
                type: 'GET',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue([]),
                urlFn: whichUrl,
                urlPropName: 'mocked-url-prop'
            };
            (util.whichUrl as jest.MockedFunction<typeof util.whichUrl>).mockReturnValue('mocked-url');
            (util.updateParamsToOptionallyAddPK as jest.MockedFunction<typeof util.updateParamsToOptionallyAddPK>).mockReturnValue(<never>{ email: "email"});
            (util.getPKHeader as jest.MockedFunction<typeof util.getPKHeader>).mockReturnValue({});
            (util.sanitizeExportType as jest.MockedFunction<typeof util.sanitizeExportType>).mockReturnValue('mocked-export-type');
            (getApiResult as jest.MockedFunction<typeof getApiResult>).mockResolvedValue(expectedResult);
            const result = await getResult(getResultParams);
            expect(result).toBe(expectedResult);
            expect(util.whichUrl).toHaveBeenCalledWith(
                getResultParams.privateKey,
                getResultParams.params,
                getResultParams.urlPropName
            );
            expect(util.updateParamsToOptionallyAddPK).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey,
                getResultParams.urlPropName
            );
            expect(util.getPKHeader).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey
            );
            expect(util.sanitizeExportType).toHaveBeenCalledWith(
                getResultParams.params?.config?.exportType
            );
            expect(getApiResult).toHaveBeenCalledWith({
                url: 'mocked-url',
                privateKey: getResultParams.privateKey,
                exportType: 'mocked-export-type',
                params: { email: "email"},
                headers: {}
            });
            expect(postApiResult).not.toHaveBeenCalled();
        });
        it('should call getApiResult when type is "GET" for an account report', async () => {
            const expectedResult = 'mocked-get-result';
            const getResultParams: GetResultParams = {
                type: 'GET',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue([]),
                urlFn: whichUrl,
                urlPropName: 'account'
            };
            (util.whichUrl as jest.MockedFunction<typeof util.whichUrl>).mockReturnValue('mocked-url');
            (util.updateParamsToOptionallyAddPK as jest.MockedFunction<typeof util.updateParamsToOptionallyAddPK>).mockReturnValue(<never>{ email: "email"});
            (util.getPKHeader as jest.MockedFunction<typeof util.getPKHeader>).mockReturnValue({});
            (util.sanitizeExportType as jest.MockedFunction<typeof util.sanitizeExportType>).mockReturnValue('mocked-export-type');
            (getApiResult as jest.MockedFunction<typeof getApiResult>).mockResolvedValue(expectedResult);
            const result = await getResult(getResultParams);
            expect(result).toBe(expectedResult);
            expect(util.whichUrl).toHaveBeenCalledWith(
                getResultParams.privateKey,
                getResultParams.params,
                getResultParams.urlPropName
            );
            expect(util.updateParamsToOptionallyAddPK).toHaveBeenCalledTimes(0)
            expect(util.getPKHeader).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey
            );
            expect(util.sanitizeExportType).toHaveBeenCalledWith(
                getResultParams.params?.config?.exportType
            );
            expect(getApiResult).toHaveBeenCalledWith({
                url: 'mocked-url',
                privateKey: getResultParams.privateKey,
                exportType: 'mocked-export-type',
                params: {},
                headers: {}
            });
            expect(postApiResult).not.toHaveBeenCalled();
        });
        it('should return undefined for invalid type', async () => {
            const getResultParams: GetResultParams = {
                type: 'INVALID',
                privateKey: 'mocked-private-key',
                params: {
                    config: {
                        exportType: 'json'
                    },
                    requestParameters: {
                        email: "foo"
                    }
                },
                validateFn: jest.fn().mockReturnValue([]),
                urlFn: whichUrl,
                urlPropName: 'mocked-url-prop'
            };

            const result = await getResult(getResultParams);

            expect(result).toBeUndefined();
            expect(util.whichUrl).toHaveBeenCalledWith(
                getResultParams.privateKey,
                getResultParams.params,
                getResultParams.urlPropName
            );
            expect(util.updateParamsToOptionallyAddPK).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey,
                getResultParams.urlPropName
            );
            expect(util.getPKHeader).toHaveBeenCalledWith(
                getResultParams.params,
                getResultParams.privateKey
            );
            expect(util.sanitizeExportType).toHaveBeenCalledWith(
                getResultParams.params?.config?.exportType
            );
            expect(postApiResult).not.toHaveBeenCalled();
            expect(getApiResult).not.toHaveBeenCalled();
        });
    });
});
