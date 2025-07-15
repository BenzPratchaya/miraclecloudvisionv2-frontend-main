import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token-interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocalStorageService } from './core/services/common/storage/local-storage.service';
import { AppConstant } from './core/models/shared/app.constant';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToasterPosition } from './core/helpers/enums';
import { AlertifyService } from './core/services';


const APP_PROVIDERS = [
  MessageService,
  ConfirmationService,
  AlertifyService,
  ToastrService
];

export function getAccessToken() {
  return LocalStorageService.getStorageValue(AppConstant.LoginToken);
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: getAccessToken,
              allowedDomains: ["localhost:44376", "localhost:8089"],
            },
          }),
      ToastrModule.forRoot({
        timeOut: 3500,
        positionClass: ToasterPosition.bottomRight,
        preventDuplicates: true,
      }),
    ],
    providers: [
      APP_PROVIDERS,
      { 
        provide: LocationStrategy, 
        useClass: HashLocationStrategy 
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true,
      },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
