import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNonAlphanumeric } from '../helpers/is-non-alphanumeric.helper';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value as string;
    const arrayPassword: string[] = password.split('');

    // Passwords must have at least one uppercase ('A'-'Z').
    const isUpperCharPresent: boolean = arrayPassword.some(
      (character) => character === character.toUpperCase()
    );

    // Passwords must have at least one digit ('0'-'9')
    const isDigitPresent: boolean = arrayPassword.some((character) =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(character))
    );

    // Passwords must have at least one non alphanumeric character
    const isAlternativeCharPresent: boolean = arrayPassword.some((character) =>
      isNonAlphanumeric(character)
    );

    if (!isUpperCharPresent || !isDigitPresent || !isAlternativeCharPresent) {
      const validationError: ValidationErrors = {
        invalidPassword: {
          value: control.value,
        },
      };
      return validationError;
    }

    return null;
  };
}
