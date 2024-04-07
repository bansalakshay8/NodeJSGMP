import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
import axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { jest } from '@jest/globals';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>; // Type-casting to allow mocking functions

const mock = new MockAdapter(axios);

describe('Public holidays module', () => {
  afterEach(() => {
    mockedAxios.get.mockClear();
    mock.reset(); // Reset the mock adapter after each test
  });

  it('Should get a list of public holidays for a specific country and year', async () => {
    const data = [{ name: "New Year's Day", date: '2022-01-01' }]; // replace with your real mock data structure
    const response: AxiosResponse = {
      data: data,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {}
    };

    mockedAxios.get.mockResolvedValue(response);
    const result = await getListOfPublicHolidays(2024, 'FR');

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('date');
    expect(result).toEqual(data);
  });

  it('Should check if today is a public holiday', async () => {
    mockedAxios.get.mockResolvedValue({ status: 200 } as AxiosResponse);
    const result = await checkIfTodayIsPublicHoliday('FR');

    expect(result).toBe(true);
  });

  it('Should get the next public holidays', async () => {
    const data = [{ name: "New Year's Day", date: '2022-01-01' }]; // replace with your real mock data structure
    const response: AxiosResponse = {
      data: data,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {}
    };

    mockedAxios.get.mockResolvedValue(response);
    const result = await getNextPublicHolidays('FR');

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('date');
    expect(result).toEqual(data);
  });

});

afterAll(() => {
  mock.restore(); // Restore the axios adapter after all the tests
});