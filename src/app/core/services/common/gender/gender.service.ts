import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  genders = [
    { label: "M", value: "Male"},
    { label: "F", value: "Female" },
    { label: "U", value: "Unknown" },
  ];
}
