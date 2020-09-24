import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cat } from '../models/cat';
import { Catapi } from '../models/catapi';

@Injectable({
  providedIn: 'root'
})
export class GetNekoService {

  constructor(private http:HttpClient) { }

  getCat(id:string): Observable<any>{
    return this.http.get("https://api.neko-atsume.emshea.com/cats/" +id) as Observable<any>;
  }

  getAllCats(): Observable<Catapi[]> {
    return this.http.get("https://api.neko-atsume.emshea.com/cats/") as Observable<Catapi[]>;
  }

  updateCat(c: Cat): Observable<Cat> {
    return this.http.put<Cat>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/cats", c) as Observable<Cat>;
  }


  getAdoptedCats(): Observable<Cat[]> {
   return this.http.get<Cat[]>("http://ec2-18-191-238-176.us-east-2.compute.amazonaws.com:8999/catadoption/cats/adopted") as Observable<Cat[]>;
  }
}
