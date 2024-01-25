/**
 * Integration Tests
 *
 * @group integration
 * @group requestLists
 */
import {RequestListResponse} from "@src/requests/interfaces";
import {ResponseXML, Request} from "@src/utils/request/interfaces";
import {requestLists} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for Request List Validation', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = 'https://www.ipqualityscore.com/api/json/requests';
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    type: "email",
                },
                updateParameters: {
                    userID: "userID"
                }
            }
            await requestLists(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            expect(actualUrl).toContain("update[userID]");
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a valid type and other valid parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a GET param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a POST param', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsGetOrPostParam: true,
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using GET', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should also work with the private key as a header using POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json',
                    pkAsHeader: true,
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a valid email address and other valid parameters and return XML', async () => {
            const params: Request = {
                config: {
                    exportType: 'xml'
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: ResponseXML = <ResponseXML>await requestLists(privateKey, params).get();
            expect(res.success).toBe(true);
            expect(res.xml).toBeTruthy();
        });
        it('should work with a valid email address and other valid parameters, but use POST', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
        it('should work with a valid email address and other valid parameters, but use POST, and accept update parameters', async () => {
            const params: Request = {
                config: {
                    exportType: 'json'
                },
                requestParameters: {
                    type: "email",
                    start_date: "2020-01-01",
                    stop_date: "2024-01-01",
                },
                updateParameters: {
                    userID: "userID"
                }
            }
            const res: RequestListResponse = <RequestListResponse>await requestLists(privateKey, params).post();
            expect(res.success).toBe(true);
            expect(res.request_count).toBeGreaterThan(0);
            expect(res.current_page).toBe(1);
            expect(res.request_id).toBeTruthy();
        });
    });
})