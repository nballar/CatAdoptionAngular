import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Userdto } from '../models/userdto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username, password) {
    // if (username === "neko" && password === "atsume") {
    //   sessionStorage.setItem('username', username)
    //   return true;
    // } else {
    //   return false;
    // }
    let ud = new Userdto(username, password);
    return this.http.post<Userdto>("http://localhost:8069/catadoption/login", ud);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

}
