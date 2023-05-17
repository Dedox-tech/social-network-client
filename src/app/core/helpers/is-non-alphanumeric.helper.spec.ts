import { isNonAlphanumeric } from './is-non-alphanumeric.helper';

describe('isNonAlphanumeric', () => {
  it('Detect non alphanumeric values in first character', () => {
    expect(isNonAlphanumeric('a')).toBeFalse();
    expect(isNonAlphanumeric('A')).toBeFalse();
    expect(isNonAlphanumeric('A@')).toBeFalse();
    expect(isNonAlphanumeric('9')).toBeFalse();
    expect(isNonAlphanumeric('98*@')).toBeFalse();
    expect(isNonAlphanumeric('@')).toBeTrue();
    expect(isNonAlphanumeric('*')).toBeTrue();
    expect(isNonAlphanumeric('<')).toBeTrue();
    expect(isNonAlphanumeric('*56')).toBeTrue();
  });
});
