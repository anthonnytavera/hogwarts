import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  calculateAge(yearOfBirth: number) {
    let today = new Date();
    let year = today.getFullYear();
    let age = 0;

    if (yearOfBirth !== 0) {
      age = year - yearOfBirth;
    }

    return age;
  }
}
