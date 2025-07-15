import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { AppConstant } from "../../models/shared/app.constant";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiPATH = "Auth/";
  constructor(
    private api: ApiService
) {}

  logout(userId: number) {
    return this.api.get<any>(`${this.apiPATH}logout/${userId}`);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      // If there is no token, the user is not logged in.
      return false;
    }

    // Parse the token to get the expiration time (exp) as a timestamp in seconds.
    const tokenData = this.decodeToken(token);
    // console.log(tokenData);
    if (!tokenData || !tokenData.exp) {
      // If the token doesn't contain an expiration time, consider the user not logged in.
      return false;
    }

    // localStorage.setItem(`${AppConfig.LoggedUser}`, tokenData.fullName);
    // localStorage.setItem(`${AppConfig.ROLES}`, tokenData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    // Get the current timestamp in seconds.
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // Compare the current time with the expiration time.
    // If the current time is before the expiration time, the user is considered logged in.
    return currentTimeInSeconds < tokenData.exp;
  }
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getToken(): string | null {
    return localStorage.getItem(`${AppConstant.LoginToken}`);
  }
}
