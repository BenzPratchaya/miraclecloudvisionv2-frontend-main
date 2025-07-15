import { FormControl, ValidatorFn } from "@angular/forms";

export const trimValidator: ValidatorFn = (control: FormControl) => {
    if(control.pristine) {
      return null;
    }
  
    if (control.value.trim()=="") {
      return {
        'trimError': true
      };
    }
  
    return null;
};