import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth';
import { LoginModel, MessageConstant, RouteConstant } from 'src/app/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { emailValidator, passwordValidator } from 'src/app/core/validators';
import { AlertifyService } from 'src/app/core/services';



@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isDisabled: boolean = false;
	showSpinner: boolean = false;
	rememberMe: boolean = false;
  _loginForm!: FormGroup;
  isDestroyed$ = new Subject<boolean>();
  loginRequestModel: LoginModel = new LoginModel();

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _loginService: LoginService,
    public layoutService: LayoutService,
    private _alertifyService: AlertifyService,
  ) {}


  ngOnInit(): void {
      this.basicInit();
  }

  get dark(): boolean {
      return this.layoutService.config.colorScheme !== 'light';
  }

  private basicInit() {
      this.loginFormInit();
      localStorage.clear();
      this._router.navigate([RouteConstant.AuthLogin]);
  }

  private loginFormInit() {
      this._loginForm = this._fb.group({
          UserEmail: ["", emailValidator],
          Password: ["", passwordValidator],
          IsCloud: [false, []],
      });
  }


  onSubmit(): void {
      if (this._loginForm?.invalid) {
    this._alertifyService.error(MessageConstant.InvalidUserAndPass);
          return;
      }

      this.isLoadingSpinner(true);
      this.loginRequestModel = this._loginForm?.value;
      this._loginService.login(this.loginRequestModel).subscribe(
          (data: any) => {
              localStorage.setItem("token", data.tokenString);
              localStorage.setItem("user", JSON.stringify(data.user));
              const loginTime = new Date().toString();
              localStorage.setItem('loginTime', loginTime);
              this.isLoadingSpinner(false);
              this._alertifyService.success(MessageConstant.LoginSuccess);
              this.routeToStudyWorkList();
          }, (error: any) => {
              this.isLoadingSpinner(false);
              this._alertifyService.error(MessageConstant.LoginFailed);
          });
  }

  

  private isLoadingSpinner(value: boolean): void {
      this.showSpinner = value;
      this.isDisabled = value;
  }

  private routeToStudyWorkList(): void {
      this._router.navigate([RouteConstant.StudyOrder]);
  }
}