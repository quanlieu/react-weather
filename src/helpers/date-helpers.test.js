import dateHelpers from './date-helpers';

describe('dateHelpers', () => {
  test('isToday', () => {
    expect(dateHelpers.isToday(new Date('2020-5-21'))).toBe(false);
    expect(dateHelpers.isToday(new Date())).toBe(true);
  })
  test('isTomorrow', () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(dateHelpers.isTomorrow(new Date('2020-5-21'))).toBe(false);
    expect(dateHelpers.isTomorrow(tomorrow)).toBe(true);
  })
});
