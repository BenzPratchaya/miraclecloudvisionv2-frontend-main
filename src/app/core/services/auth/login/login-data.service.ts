import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { LoginModel } from 'src/app/core/models';


@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  private apiPath = "Auth/";

  constructor(
    private _apiService: ApiService
  ) {}

  login(request: LoginModel): Observable<any> {
    return this._apiService.post<any>(`${this.apiPath}login`, request);
  }


  logout(userId: number): Observable<any> {
    return this._apiService.get<any>(`${this.apiPath}logout/${userId}`);
  }

}