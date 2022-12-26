import { isJsonString, formatPostDate } from '.';

describe('isJsonString', () => {
  it('should return true if the string is a valid JSON string', () => {
    const validJsonString = '{"name": "John"}';
    expect(isJsonString(validJsonString)).toBe(true);
  });
  it('should return false if the string is not a valid JSON string', () => {
    const invalidJsonString = 'name: John';
    expect(isJsonString(invalidJsonString)).toBe(false);
  });
});

describe('formatPostDate', () => {
  it('should return a formated date in french', () => {
    const dateString = '2020-08-20T00:00:00.000Z';
    const simpleLocale = 'fr';
    const expected = '20 août 2020';
    expect(formatPostDate(dateString, simpleLocale)).toBe(expected);
  });
  it('should return a formated date in english', () => {
    const dateString = '2020-08-20T00:00:00.000Z';
    const simpleLocale = 'en';
    const expected = 'Aug 20, 2020';
    expect(formatPostDate(dateString, simpleLocale)).toBe(expected);
  });
});
