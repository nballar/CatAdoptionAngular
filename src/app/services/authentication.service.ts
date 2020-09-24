import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Userdto } from '../models/userdto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(username, password): Observable<User> {
    console.log("in authenticate");
    let ud = new Userdto(username, password);
    //return this.http.post<User>("http://localhost:8999/catadoption/login", ud) as Observable<User>;
    return this.http.post<User>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/login", ud) as Observable<User>;
  }

  update(user): Observable<User> {
    //return this.http.put<User>("http://localhost:8999/catadoption/user", user) as Observable<User>;
    return this.http.put<User>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/user", user) as Observable<User>;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('user')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('user')
  }

}
