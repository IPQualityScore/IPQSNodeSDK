/**
 * getProxyDetectionResult Unit Tests
 *
 * @group unit
 * @group util
 */

import {
    serializeParams,
    filterObjectByKeys,
    getIpAddress, getPKHeader,
    isValidDateFormat,
    sanitizeExportType,
    updateParamsToOptionallyAddPK,
    whichUrl,
    generateUpdatePostParams,
    validateDates, disallowPKConfigs
} from "@src/utils/index";
import {Request} from "@src/utils/request/interfaces";
import {BASE_URL} from "@src/utils/request/const";

describe('util', () => {
    describe('sanitizeExportType()', () => {
        it('should return the input value if it is "json"', () => {
            const input = 'json';
            const output = sanitizeExportType(input);
            expect(output).toEqual('json');
        });
        it('should return the input value if it is "xml"', () => {
            const input = 'xml';
            const output = sanitizeExportType(input);
            expect(output).toEqual('xml');
        });
        it('should return "json" if the input is not "json" or "xml"', () => {
            const input = 'txt';
            const output = sanitizeExportType(input);
            expect(output).toEqual('json');
        });
    });
    describe('serializeParams()', () => {
        it('should return an empty string if no parameters are passed in', () => {
            const params = {};
            const result = serializeParams(params);
            expect(result).toEqual('');
        });
        it('should correctly build post parameters for a single parameter', () => {
            const params = { foo: 'bar' };
            const result = serializeParams(params);
            expect(result).toEqual('foo=bar');
        });
        it('should correctly build post parameters for multiple parameters', () => {
            const params = { foo: 'bar', baz: 'qux' };
            const result = serializeParams(params);
            expect(result).toEqual('foo=bar&baz=qux');
        });
        it('should correctly handle special characters in parameter values', () => {
            const params = { foo: 'hello world', bar: 'https://example.com/?q=1&lang=en' };
            const result = serializeParams(params);
            expect(result).toEqual('foo=hello%20world&bar=https%3A%2F%2Fexample.com%2F%3Fq%3D1%26lang%3Den');
        });
    });
    describe('filterObjectByKeys()', () => {
        it('should return an empty object if the input object is empty', () => {
            const obj = {};
            const keys: string[] = [];
            const result = filterObjectByKeys(obj, keys);
            expect(result).toEqual({});
        });
        it('should correctly filter out a single key from the input object', () => {
            const obj = { name: 'Alice', age: 30, ip_address: '127.0.0.1' };
            const keys: string[] = ['ip_address'];
            const result = filterObjectByKeys(obj, keys);
            expect(result).toEqual({ name: 'Alice', age: 30 });
        });
        it('should correctly filter out multiple keys from the input object', () => {
            const obj = { name: 'Alice', age: 30, ip_address: '127.0.0.1', email: 'alice@example.com' };
            const keys: string[] = ['ip_address', 'email'];
            const result = filterObjectByKeys(obj, keys);
            expect(result).toEqual({ name: 'Alice', age: 30 });
        });
        it('should not modify the input object', () => {
            const obj = { name: 'Alice', age: 30, ip_address: '127.0.0.1' };
            const keys: string[] = ['ip_address', 'email'];
            filterObjectByKeys(obj, keys);
            expect(obj).toEqual({ name: 'Alice', age: 30, ip_address: '127.0.0.1' });
        });
    });
    describe('isValidDateFormat()', () => {
        it('should return true for valid dates', () => {
            const input = '2022-01-01';
            const regexArr = [/\d{4}-\d{2}-\d{2}/];
            expect(isValidDateFormat(input, regexArr)).toBe(true);
        });
        it('should return false for invalid dates', () => {
            const input = 'invalid-date-format';
            const regexArr = [/\d{4}-\d{2}-\d{2}/];
            expect(isValidDateFormat(input, regexArr)).toBe(false);
        });
        it('should return false for dates that do not match any regex in the array', () => {
            const input = '2022/01/01';
            const regexArr = [/\d{4}-\d{2}-\d{2}/];
            expect(isValidDateFormat(input, regexArr)).toBe(false);
        });
        it('should return true for dates that match any regex in the array', () => {
            const input = '2022/01/01';
            const regexArr = [/\d{4}-\d{2}-\d{2}/, /\d{4}\/\d{2}\/\d{2}/];
            expect(isValidDateFormat(input, regexArr)).toBe(true);
        });
    });
    describe('disallowPKConfigs()', () => {
        it('should disallow any pk config', () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                    pkAsHeader: false
                }
            };
            const res = disallowPKConfigs(params);
            expect(res).toBe(false);
        });
        it('should allow no pk configs', () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                }
            };
            const res = disallowPKConfigs(params);
            expect(res).toBe(true);
        });
    });
    describe('getIpAddress()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        it('returns the provided ip address if it exists', () => {
            const ipAddress = '8.8.8.8';
            const actualIpAddress = getIpAddress(ipAddress);
            expect(actualIpAddress).toEqual(ipAddress);
        });
        it('returns default ip address if ip address is empty', () => {
            const expectedIpAddress = '';
            const actualIpAddress = getIpAddress('');
            expect(actualIpAddress).toEqual(expectedIpAddress);
        });
        it('returns default ip address if ip address is null', () => {
            const expectedIpAddress = '';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const actualIpAddress = getIpAddress(null);
            expect(actualIpAddress).toEqual(expectedIpAddress);
        });
    });
    describe('whichUrl()', () => {
        const privateKey = 'privateKey';
        const params: Request = {
            config: {
                exportType: 'json',
                pkAsGetOrPostParam: true,
                pkAsHeader: false
            },
            requestParameters: {
                email: 'value1',
                fast: true
            }
        };
        it('should return the URL with pkAsGetOrPostParam', () => {
            const urlPropName = 'param1';
            const result = whichUrl(privateKey, params, urlPropName);
            const sanitizedExportType = sanitizeExportType(params.config.exportType);
            const expectedUrl = `${BASE_URL}/${sanitizedExportType}/${urlPropName}`;
            expect(result).toBe(expectedUrl);
        });
        it('should return the URL with pkAsHeader', () => {
            const urlPropName = 'param1';
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = true;
            const result = whichUrl(privateKey, params, urlPropName);
            const sanitizedExportType = sanitizeExportType(params.config.exportType);
            const expectedUrl = `${BASE_URL}/${sanitizedExportType}/${urlPropName}`;
            expect(result).toBe(expectedUrl);
        });
        it('should return the URL with privateKey and value', () => {
            const urlPropName = 'param1';
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = false;
            const result = whichUrl(privateKey, params, urlPropName);
            const sanitizedExportType = sanitizeExportType(params.config.exportType);
            const value = (params.requestParameters as never)[urlPropName];
            const expectedUrl = `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}/${value}`;
            expect(result).toBe(expectedUrl);
        });
        it('should also work with the requests API', () => {
            const urlPropName = 'requests';
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = false;
            const result = whichUrl(privateKey, params, urlPropName);
            const sanitizedExportType = sanitizeExportType(params.config.exportType);
            const expectedUrl = `${BASE_URL}/${sanitizedExportType}/${urlPropName}/${privateKey}/list`;
            expect(result).toBe(expectedUrl);
        });
    });
    describe('updateParamsToOptionallyAddPK()', () => {
        const privateKey = 'privateKey';
        const params: Request = {
            config: {
                exportType: 'json',
                pkAsGetOrPostParam: true,
                pkAsHeader: false
            },
            requestParameters: {
                email: 'value1',
                fast: true
            }
        };
        it('should add privateKey to requestParameters when pkAsGetOrPostParam is true', () => {
            const urlProp = "foo";
            const updatedParams = updateParamsToOptionallyAddPK(params, privateKey, urlProp);
            expect(updatedParams).toEqual({
                key: privateKey,
                email: 'value1',
                fast: true
            });
        });
        it('should add privateKey to requestParameters when pkAsHeader is true', () => {
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = true;
            const urlProp = "foo";
            const updatedParams = updateParamsToOptionallyAddPK(params, privateKey, urlProp);
            expect(updatedParams).toEqual({
                key: privateKey,
                email: 'value1',
                fast: true
            });
        });
        it('should not add privateKey to requestParameters when both pkAsGetOrPostParam and pkAsHeader are false', () => {
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = false;
            const urlProp = "foo";
            const updatedParams = updateParamsToOptionallyAddPK(params, privateKey, urlProp);
            expect(updatedParams).toEqual({
                email: 'value1',
                fast: true
            });
        });
        it('should filter out a value if urlProp exists', () => {
            params.config.pkAsGetOrPostParam = false;
            params.config.pkAsHeader = false;
            const urlProp = "fast";
            const updatedParams = updateParamsToOptionallyAddPK(params, privateKey, urlProp);
            expect(updatedParams).toEqual({
                email: 'value1'
            });
        });
    });
    describe('getPKHeader()', () => {
        const privateKey = 'privateKey';
        const params: Request = {
            config: {
                exportType: 'json',
                pkAsGetOrPostParam: false,
                pkAsHeader: true
            },
            requestParameters: {
                email: 'value1',
                fast: true
            }
        };
        it('should return an empty object when pkAsHeader is false', () => {
            params.config.pkAsHeader = false;
            const result = getPKHeader(params, privateKey);
            expect(result).toEqual({});
        });
        it('should return an object with "IPQS-KEY" property when pkAsHeader is true', () => {
            params.config.pkAsHeader = true;
            const result = getPKHeader(params, privateKey);
            expect(result).toEqual({ 'IPQS-KEY': privateKey });
        });
        it('should not modify the original params object', () => {
            const originalParams = { ...params };
            getPKHeader(params, privateKey);
            expect(params).toEqual(originalParams);
        });
    });
    describe('generateUpdatePostParams()', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        it('should return an empty string if updateParams is empty', () => {
            const updateParams = {};
            const expected = {};
            expect(generateUpdatePostParams(updateParams)).toEqual(expected);
        });
        it('should return a string with one update parameter', () => {
            const updateParams = {
                language: 'value1',
            };
            const expected = {
                "update[language]": "value1"
            };
            expect(generateUpdatePostParams(updateParams)).toEqual(expected);
        });
        it('should return a string with multiple update parameters', () => {
            const updateParams = {
                language: 'value1',
                user_agent: 'value2',
                ClickDate: 'value3',
            };
            const expected = {
                "update[language]": "value1",
                "update[user_agent]": "value2",
                "update[ClickDate]": "value3"
            };
            expect(generateUpdatePostParams(updateParams)).toEqual(expected);
        });
        it('should correctly encode special characters in parameter values', () => {
            const updateParams = {
                language: 'special characters: &, /, ?, :, ;, =, +, $, #, [, ], %, {, }, |, \', ", <, >',
            };
            const expected = {
                "update[language]": "special%20characters%3A%20%26%2C%20%2F%2C%20%3F%2C%20%3A%2C%20%3B%2C%20%3D%2C%20%2B%2C%20%24%2C%20%23%2C%20%5B%2C%20%5D%2C%20%25%2C%20%7B%2C%20%7D%2C%20%7C%2C%20'%2C%20%22%2C%20%3C%2C%20%3E"
            };
            expect(generateUpdatePostParams(updateParams)).toEqual(expected);
        });
    });
    describe('validateDates()', () => {
        it('should return true when all date values are valid', () => {
            const obj = { ConversionDate: '2022-01-01', ClickDate: '2022-01-02' };
            const keysToTest = ['ConversionDate', 'ClickDate'];
            const result = validateDates(obj, keysToTest);
            expect(result).toBe(true);
        });

        it('should return false when at least one date value is invalid', () => {
            const obj = { ConversionDate: '2022-01-01', ClickDate: 'invalid-date' };
            const keysToTest = ['ConversionDate', 'ClickDate'];
            const result = validateDates(obj, keysToTest);
            expect(result).toBe(false);
        });

        it('should not call isValidDateFormat if the object does not contain date keys', () => {
            const obj = { other_key: 'value' };
            const keysToTest = ['ConversionDate', 'ClickDate'];
            const result = validateDates(obj, keysToTest);
            expect(result).toBe(true);
        });
    });
});

