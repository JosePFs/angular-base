import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static maxIntegerValidator(num: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (value == null || value.length === 0) {
        return null;
      }

      return !Number.isInteger(value) || Number(value) > num
        ? { maxInteger: true }
        : null;
    };
  }
}
