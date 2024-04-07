import supertest from 'supertest';

const api = supertest("https://date.nager.at/Api/v3");

describe('Nager.Date API E2E tests', () => {
  it('should return a list of public holidays for a specific year and country', async () => {
    const response = await api.get('/PublicHolidays/2022/US');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('date');
    expect(response.body[0]).toHaveProperty('localName');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('should return whether today is public holiday in a specific country or not', async () => {
    const response = await api.get('/IsTodayPublicHoliday/FR');

    expect(response.status).toBe(204);
    expect(response.body).toBeDefined();
  });
});