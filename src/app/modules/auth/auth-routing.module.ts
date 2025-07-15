import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupHospitalComponent } from './components/signup-hospital/signup-hospital.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent },
    { path: 'signup/hospital', component: SignupHospitalComponent },
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
