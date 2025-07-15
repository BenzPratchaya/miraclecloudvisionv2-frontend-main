import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrl!: string;
  private imageUrlSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor() {}

  setImageUrl(url: string) {
    this.imageUrl = url;
    this.imageUrlSubject.next(url);
  }

  getImageUrl() {
    return this.imageUrlSubject.asObservable();
  }

  getCurrentImageUrl() {
    return this.imageUrl;
  }
}
