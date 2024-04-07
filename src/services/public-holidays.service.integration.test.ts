import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from './public-holidays.service';
// Integration tests
describe('Public holidays API integration tests', () => {

    test('getListOfPublicHolidays returns expected fields', async () => {
        const holidays = await getListOfPublicHolidays(2024, 'FR');

        expect(Array.isArray(holidays)).toBe(true);
        expect(holidays.length).toBeGreaterThan(0);
        expect(holidays[0]).toHaveProperty('name');
        expect(holidays[0]).toHaveProperty('localName');
        expect(holidays[0]).toHaveProperty('date');
    });

    test('checkIfTodayIsPublicHoliday returns a boolean', async () => {
        const result = await checkIfTodayIsPublicHoliday('FR');

        expect(typeof result).toBe('boolean');
    });

    test('getNextPublicHolidays returns expected fields', async () => {
        const holidays = await getNextPublicHolidays('FR');

        expect(Array.isArray(holidays)).toBe(true);
        expect(holidays.length).toBeGreaterThan(0);
        expect(holidays[0]).toHaveProperty('name');
        expect(holidays[0]).toHaveProperty('localName');
        expect(holidays[0]).toHaveProperty('date');
    });

});