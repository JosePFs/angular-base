import { FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

describe('Custom validators', () => {
  it('should be able to validate maximum integer', () => {
    let validation = CustomValidators.maxIntegerValidator(5)(
      new FormControl(10)
    );
    expect(validation).toEqual({ maxInteger: true });

    validation = CustomValidators.maxIntegerValidator(5)(new FormControl(1));
    expect(validation).toEqual(null);
  });
});
