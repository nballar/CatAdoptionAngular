import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  addUser(u:User): Observable<User> {
    let body:User = u;
    return this.http.post<User>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/user", body);
  }
}
