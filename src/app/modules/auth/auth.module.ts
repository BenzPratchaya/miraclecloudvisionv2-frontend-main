import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupHospitalComponent } from './components/signup-hospital/signup-hospital.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AuthRoutingModule
    ],
    declarations: [
    LoginComponent,
    SignupHospitalComponent
  ]
})
export class AuthModule { }
