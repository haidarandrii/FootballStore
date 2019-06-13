import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
export type ValidatorFn = (c: AbstractControl) => ValidationErrors|null;

export class FormValidator {
    static matchingPasswords(c: AbstractControl): {[key: string]: any} {
        const password = c.get(['passwords']);
        const confirmPassword = c.get(['confirmpwd']);
        if (password.value !== confirmPassword.value) {
            return { mismatchedPasswords: true };
        }
        return null;
    }
}

