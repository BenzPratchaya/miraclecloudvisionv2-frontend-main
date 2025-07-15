import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // console.log(this.authService.isMenuAccess());
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }

 
}
