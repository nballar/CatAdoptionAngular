import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }


  getUser(id:Number): Observable<User> {
    return this.http.get<User>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/user/" + id) as Observable<User>
  }

  addTask(t:Task): Observable<Task>{
    //t.doer.userid = Number(sessionStorage.getItem("user"));
    return this.http.post("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/task", t) as Observable<Task>
  }

}
