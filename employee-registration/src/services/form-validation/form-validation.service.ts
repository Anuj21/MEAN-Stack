import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  showErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const abstractControl: AbstractControl = form.controls[key];
      if (abstractControl instanceof FormControl) {
        abstractControl.markAsTouched({ onlySelf: true });
        abstractControl.updateValueAndValidity({ onlySelf: true });
      } else if (abstractControl instanceof FormArray) {
        (abstractControl as FormArray).controls.forEach((control) => {
          control.markAsTouched({ onlySelf: true });
          control.updateValueAndValidity({ onlySelf: true });
        });
      } else if (abstractControl instanceof FormGroup) {
        this.showErrors(abstractControl as FormGroup);
      }
    });
  }
}
