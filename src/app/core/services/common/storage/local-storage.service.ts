import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export  class LocalStorageService {
  constructor() { }
  
  static setStorageValue(type: string, val: any) {
    localStorage.setItem(type, val);
  }

  static  getStorageValue  (type: string) {
   return localStorage.getItem(type);
  }

  static  getUserStorageValue(): User {
    return JSON.parse(localStorage.getItem("user"));
  }
}
