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
    console.log("in authenticate");
    let ud = new Userdto(username, password);
    return this.http.post<User>("http://localhost:8999/catadoption/login", ud);
    //set the rreturned user to a variable and store that globably in the project to be accessed
    //by user profile and cat profile
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('user')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('user')
  }

}
