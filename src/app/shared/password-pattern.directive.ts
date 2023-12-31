import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pattern = /^(?=.*[A-Z]).{6,}$/;
    return pattern.test(control.value) ? null : { pattern: true };
}