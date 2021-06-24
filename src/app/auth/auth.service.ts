import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  isAuthenticated() {
    const token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : undefined;
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
