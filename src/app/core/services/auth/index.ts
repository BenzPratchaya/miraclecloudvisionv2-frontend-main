import { AuthService } from "./auth.service";
import { LoginDataService } from "./login/login-data.service";
import { LoginFormService } from "./login/login-form.service";
import { LoginService } from "./login/login.service";

export const authServices = [
    AuthService,
    LoginService,
    LoginDataService,
    LoginFormService,
];

export * from "./login/login-data.service";
export * from "./login/login-form.service";
export * from "./login/login.service";