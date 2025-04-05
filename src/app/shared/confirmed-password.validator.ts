import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passControl = formGroup.get(password)
        const confirmPassControl = formGroup.get(confirmPassword)

        if(!passControl || !confirmPassControl) {
            return null;
        }

        if(confirmPassControl.errors && !confirmPassControl.errors['passwordMismatch']) {
            return null;
        }
        
        if(passControl.value !== confirmPassControl.value) {
            confirmPassControl.setErrors({ passwordMismatch: true })
            return {passwordMismatch: true}
        } else {
            confirmPassControl.setErrors(null)
            return null;
        }
    } 
}