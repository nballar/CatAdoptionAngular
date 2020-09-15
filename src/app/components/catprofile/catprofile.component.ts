import { Component, OnInit } from '@angular/core';
import { GetNekoService } from '../../services/getneko.service';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-catprofile',
  templateUrl: './catprofile.component.html',
  styleUrls: ['./catprofile.component.css']
})
export class CatprofileComponent implements OnInit {
  public cat: Cat = null;
  public input: string;
  constructor(private cs: GetNekoService) { }

  ngOnInit(): void {
  }
  getCats(): void {
    this.cs.getCat(this.input).subscribe(
      (data) => {
        this.cat = data;
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }


  getAllCats(): void {
    this.cs.getAllCats().subscribe(
      (data) => {
        console.log(data)
        for (let c in data) {
          console.log(c);
        }
        
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }
}
