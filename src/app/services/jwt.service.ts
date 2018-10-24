import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): String {
    return localStorage['jwtToken'];
  }

  saveToken(token: String) {
    localStorage['jwtToken'] = token;
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }
}
