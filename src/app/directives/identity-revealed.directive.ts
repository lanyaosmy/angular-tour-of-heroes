import { Directive } from '@angular/core';
import {
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
} from '@angular/forms';

export const identityRevealedValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const name = control.get('name');
  const alterEgo = control.get('alterEgo');
  return name && alterEgo && name.value === alterEgo.value
    ? { identityRevealed: true }
    : null;
};

@Directive({
  selector: '[appIdentityRevealed]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IdentityRevealedDirective,
      multi: true,
    },
  ],
})
export class IdentityRevealedDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return identityRevealedValidator(control);
  }
}
