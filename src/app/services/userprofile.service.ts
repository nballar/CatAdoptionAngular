import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }


  getUser(id:Number): Observable<User> {
    return this.http.get<User>("http://localhost:8999/catadoption/user/" + id) as Observable<User>
  }

}
