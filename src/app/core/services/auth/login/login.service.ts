import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/core/models';
import { ApiService } from '../../api/api.service';

@Injectable({
    providedIn: "root"
})
export class LoginService {
    private apiPATH = "Auth/";

    constructor(
        private _api: ApiService,
    ) { }

    login(requst: LoginModel) {
        return this._api.post<any>(`${this.apiPATH}login`, requst);
    }

    logout(userId: number) {
        return this._api.get<any>(`${this.apiPATH}logout/${userId}`);
    }
    
}