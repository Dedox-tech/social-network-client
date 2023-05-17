import { FormControl } from '@angular/forms';
import { validatePasswordLogic } from './password.validator';

describe('validatePasswordLogic', () => {
  it('Ignore falsy values', () => {
    expect(validatePasswordLogic(new FormControl(''))).toBeNull();
    expect(validatePasswordLogic(new FormControl(null))).toBeNull();
    expect(validatePasswordLogic(new FormControl(undefined))).toBeNull();
  });
  it('Reject passwords without upper letters', () => {
    expect(validatePasswordLogic(new FormControl('hecreswayi7rl7e$6ku7'))).toEqual({
      invalidPassword: {
        value: 'hecreswayi7rl7e$6ku7',
      },
    });
  });
  it('Reject passwords without digits', () => {
    expect(validatePasswordLogic(new FormControl('hecreAswayirle$ku'))).toEqual({
      invalidPassword: {
        value: 'hecreAswayirle$ku',
      },
    });
  });
  it('Reject passwords without special characters', () => {
    expect(validatePasswordLogic(new FormControl('hecreAswayirleku'))).toEqual({
      invalidPassword: {
        value: 'hecreAswayirleku',
      },
    });
  });
  it('Accept password with at least one upper letter, one digit, and one special character', () => {
    expect(validatePasswordLogic(new FormControl('hecreAswayi7rl7e$6ku7'))).toBeNull();
    expect(validatePasswordLogic(new FormControl('J5p1rAkeRer+piTeyas7'))).toBeNull();
    expect(validatePasswordLogic(new FormControl('4ebo4lrA@urif1weyiko'))).toBeNull();
  });
});
