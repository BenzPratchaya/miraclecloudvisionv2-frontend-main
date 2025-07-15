import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";



/** A hero's name can't match the given regular expression */
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
      if(control.pristine) {
    return null;
   }

   const re = /^[a-zA-Z_\- ]*$/g
     const patt = new RegExp(re);
     const _result_ = patt.test(control.value.trim());

     if (!_result_) {
    return {
      'nameError': true
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