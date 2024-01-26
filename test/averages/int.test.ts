/**
 * Integration Tests
 *
 * @group integration
 * @group averages
 */
import {
    AveragesParams,
    AveragesResponse,
} from "@src/averages/interfaces";
import {averages} from "@src/index";

const privateKey = <string>process.env.PRIVATE_KEY;
describe('Integration Tests for ProxyDetection Averages', () => {
    describe("Ensuring it calls the right URL", () => {
        it('calls the correct URL', async () => {
            const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(<never>{ status: 200, json: jest.fn().mockResolvedValue({}) });
            const url = `https://www.ipqualityscore.com/api/${privateKey}/proxy/average`;
            const params: AveragesParams = {
                country: 'all',
                start_date: '2000-01-01',
                end_date: '2000-01-01',
            }
            await averages(privateKey, params).get();
            const actualUrl = mockFetch.mock.calls[0][0];
            expect(actualUrl).toContain(url);
            mockFetch.mockRestore();
        });
    });
    describe("Calling the API", () => {
        it('should work with a valid IP4 address and other valid parameters', async () => {
            const params: AveragesParams = {
                country: 'all',
                start_date: '2000-01-01',
                end_date: '2000-01-01',
            }
            const res: AveragesResponse = <AveragesResponse>await averages(privateKey, params).get();
            expect(res.success).toBe(false);
            expect(res.message).toBe("Unable to locate records matching your request.");
        });
    });
})