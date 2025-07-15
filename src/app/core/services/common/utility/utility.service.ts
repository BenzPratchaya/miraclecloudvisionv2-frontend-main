import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  static CopyToClipBoard(text:any){
    navigator.clipboard.writeText(text)
    .then(() => {
      // console.log('Text copied to clipboard:', 'dd');
    })
    .catch(err => {
      // console.error('Failed to copy text:', 'dd');
    });
  }
}
