import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { emailValidator, passwordValidator } from 'src/app/core/validators';


@Injectable()
export class LoginFormService {

  constructor(
    private _fb: FormBuilder
) {}

  loginForm = this._fb.nonNullable.group({
    UserEmail: new FormControl<string>('', emailValidator),
    Password: new FormControl<string>('', passwordValidator),
    IsCloud: new FormControl<boolean>(false)
  });

}