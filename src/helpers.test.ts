import { validateInput, shortenPublicHoliday } from './helpers';
import { PublicHoliday } from './types';


describe('helpers', () => {
  describe('validateInput', () => {
    it('throws error when country is not supported', () => {
      expect(() => validateInput({ country: 'unsupported_country' })).toThrow(`Country provided is not supported, received: unsupported_country`);
    });

    it('throws error when year is not current year', () => {
      const nextYear = new Date().getFullYear() + 1;
      expect(() => validateInput({ year: nextYear })).toThrow(`Year provided not the current, received: ${nextYear}`);
    });

    it('does not throw error when country is supported and year is current year', () => {
      const year = new Date().getFullYear();
      expect(() => validateInput({ country: 'FR', year: year })).not.toThrow();
    });
  });

  describe('shortenPublicHoliday', () => {
    it('returns holiday with only name, localName, and date', () => {
      const input: PublicHoliday = {
        name: 'holiday1',
        localName: 'localHoliday1',
        date: '2024-02-01',
        countryCode: 'FR',
        fixed: false,
        global: false,
        launchYear: 1967,
        counties: null,
        types: ['Type1', 'Type2']
      };

      const output = { name: 'holiday1', localName: 'localHoliday1', date: '2024-02-01' };
      expect(shortenPublicHoliday(input)).toEqual(output);
    });
  });
});