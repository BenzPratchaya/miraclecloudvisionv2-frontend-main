import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";



/** A hero's name can't match the given regular expression */
export function emailPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.pristine) {
      return null;
    }
    const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const patt = new RegExp(re);
    const _result_ = patt.test(control.value.trim());
    if (!_result_) {
      return {
        'emailError': true
      };
    }
  
    return null;
  };
}


// export const nameValidator: ValidatorFn = (control: FormControl) => {
  
//   if(control.pristine) {
//     return null;
//   }
//   // const re = /^[a-zA-Z0-9_\-]*$/;
//   const re = /^[a-zA-Z_\- ]*$/g
//   const patt = new RegExp(re);
//   const _result_ = patt.test(control.value.trim());
//   if (!_result_) {
//     return {
//       'nameError': true
//     };
//   }

//   return null;
// };