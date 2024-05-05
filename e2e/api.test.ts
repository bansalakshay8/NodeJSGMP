import * as request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../src/config';

describe('/PublicHolidays', () => {
    it('should return 200 and list of public holidays of given country', async() => {
        const COUNTRY: string = 'AU';
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/2024/${COUNTRY}`);
        expect(status).toEqual(200);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0].countryCode).toBe(COUNTRY);
    });
});

describe('/IsTodayPublicHoliday', () => {
    it('should return correct status code', async() => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/AU`);
        expect(status).toBeGreaterThanOrEqual(200);
    });
});
