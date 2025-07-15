import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { HrEmpVerify } from '../../models/settings/radiologist-signup/HrEmpVerify';

@Injectable({
  providedIn: 'root'
})
export class UserVerifyService {

  private apiPATH = "UserVerify/";
  constructor(private router: Router, private api: ApiService) {}

  SendVerificationCode(userVerify:HrEmpVerify){
    return this.api.post<HrEmpVerify>(`${this.apiPATH}addUserVerificationInfo`,userVerify);
  }


  verifyOTP(userVerify:HrEmpVerify){
    return this.api.post<HrEmpVerify>(`${this.apiPATH}verifyOTP`,userVerify);
  }
}
