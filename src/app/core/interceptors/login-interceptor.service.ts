import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from '../services/common/storage/local-storage.service';
import { AppConstant } from '../models/shared/app.constant';


@Injectable()
export class LoginInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = LocalStorageService.getStorageValue(AppConstant.LoginToken);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
            url: request.url.includes(environment.apiUrl) ? request.url : environment.apiUrl + request.url
        });
        return next.handle(request);
    }

}