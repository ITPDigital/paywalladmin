import { FormGroup,AbstractControl, ValidatorFn } from '@angular/forms';

export class customValidators {
    // custom validator to check that two fields match
    static MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    static isNumberCheck(): ValidatorFn {
        return  (c: AbstractControl): {[key: string]: boolean} | null => {
          let number = /^[.\d]+$/.test(c.value) ? +c.value : NaN;
          if (number !== number) {
            return { 'value': true };
          }
    
          return null;
        };
      }
}