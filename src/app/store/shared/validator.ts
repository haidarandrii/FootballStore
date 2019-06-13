import { FormControl } from '@angular/forms';

export class FormValidator {
    static matchingPasswords = (component, formName) => (c: FormControl): {[key: string]: any} => {
        if (!component[formName]) {
            return null;
        }
        const { password } = component[formName].controls;
        if (password.value !== c.value) {
            return { mismatchedPasswords: true };
        }
        return null;
    }
}

