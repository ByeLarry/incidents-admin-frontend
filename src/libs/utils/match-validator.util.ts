import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function mustMatch(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control as FormGroup;
    const controlToMatch = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (
      matchingControl &&
      controlToMatch &&
      controlToMatch.value !== matchingControl.value
    ) {
      return { mustMatch: true };
    }
    return null;
  };
}
