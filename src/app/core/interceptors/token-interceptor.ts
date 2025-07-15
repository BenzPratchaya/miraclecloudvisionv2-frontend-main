import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { LocalStorageService } from '../services/common/storage/local-storage.service';
import { AppConstant } from '../models/shared/app.constant';
  
  
  @Injectable()
  export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private _auth: AuthService
    ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${LocalStorageService.getStorageValue(AppConstant.LoginToken)}`
        }
      });
      return next.handle(request);
    }
  }
  