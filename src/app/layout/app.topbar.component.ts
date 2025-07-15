import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { MessageConstant, RouteConstant, User } from '../core/models';
import { environment } from 'src/environments/environment';
import { AlertifyService, ImageService, LocalStorageService } from '../core/services';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    searchActive: boolean = false;
    client!: User;
    currentUserName!: string;
    currentUserProfilePhoto!: string;
    defaultProfilePhoto!: string;
    profileImagerUrl = environment.profileImagerUrl;
    loginUserOrgName!: string;
    demoHospitalLogo!: string;
    imageUrl!: string;

    constructor(
        public layoutService: LayoutService,
        public el: ElementRef,
        private _router: Router,
        private _authService: AuthService,
        private _imageService: ImageService,
        private _alertifyService: AlertifyService,
    ) { }

    ngOnInit(): void {
        this.basicInit();
    }

    private basicInit() {
        this.getCurrentUserInfo();
        this._imageService.getImageUrl().subscribe((url: string) => {
        this.imageUrl = url;
        });
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
    
    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }

    getCurrentUserInfo() {
        let user = LocalStorageService.getUserStorageValue();
        if (!user) {
            this._router.navigate(["/auth/login"]);
        }
        this.loginUserOrgName = user.OrgName;
        this.currentUserName = user.Fname + " " + user.Lname;
        if (user.ImgFileName != null && user.ImgFileName !== "") {
          this.defaultProfilePhoto =
            this.profileImagerUrl +
            "Profile/" +
            user.EmpId +
            "/" +
            user.ImgFileName;
        } else {
          this.defaultProfilePhoto = "./assets/app_images/topbar/avatar.png";
        }
    
        this.demoHospitalLogo = "./assets/app_images/topbar/demo-hospital.png";
    }

    logout() {
        let userString = localStorage.getItem("user");
        if (userString !== null) {
            this.client = JSON.parse(userString) as User;
            this._authService.logout(this.client.EmpId).subscribe(
                (res: any) => {
                  localStorage.removeItem("token");
                  sessionStorage.removeItem("user");
                  localStorage.removeItem("loginTime");
                  localStorage.clear();
                  this._alertifyService.success(MessageConstant.LogoutSuccess);
                  this._router.navigate([RouteConstant.AuthLogin]);
                }
              );

        } else {
            this._alertifyService.error(MessageConstant.SomethingWrong);
        }
    }
}