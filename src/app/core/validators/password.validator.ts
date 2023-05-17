import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNonAlphanumeric } from '../helpers/is-non-alphanumeric.helper';

export function passwordValidator(): ValidatorFn {
  return validatePasswordLogic;
}

export function validatePasswordLogic(control: AbstractControl): ValidationErrors | null {
  const password: string | null = control.value;

  // No validation is going to be performed if the string is empty or null
  if (password === null || password === '') {
    return null;
  }

  const arrayPassword: string[] = password.split('');

  // Passwords must have at least one uppercase ('A'-'Z').
  // We need to be sure that special characters ($, *) or number will not be considered
  // The additional check was added. More info:
  // https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip/31415820#31415820
  const isUpperCharPresent: boolean = arrayPassword.some(
    (character) => character === character.toUpperCase() && character !== character.toLowerCase()
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
}
