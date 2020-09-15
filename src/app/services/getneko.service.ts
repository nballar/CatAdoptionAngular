import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cat } from '../models/cat';

@Injectable({
  providedIn: 'root'
})
export class GetNekoService {

  constructor(private http:HttpClient) { }

  getCat(id:string): Observable<Cat>{

    return this.http.get("https://api.neko-atsume.emshea.com/cats/" +id) as Observable<Cat>;
  }

  getAllCats(): Observable<Cat[]> {
    return this.http.get("https://api.neko-atsume.emshea.com/cats/") as Observable<Cat[]>;
  }
}
