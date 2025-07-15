import { FormControl, ValidatorFn } from "@angular/forms";

export const phoneNumberValidator: ValidatorFn = (control: FormControl) => {
  
  if(control.pristine) {
    return null;
  }
  // const re = /^\d+$/;
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
  const patt = new RegExp(re);
  const _result_ = patt.test(control.value.trim());
  if (!_result_) {
    return {
      'phoneNumberError': true
    };
  }

  return null;
};