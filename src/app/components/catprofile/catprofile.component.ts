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
  public visible: boolean;
  public hide: boolean = false;
  public catId: String;
  cats: Cat[];

  constructor(private cs: GetNekoService) { }

  ngOnInit(): void {
    this.getAllCatsFunc();
  }
  getCats(): void {
    this.visible = false;
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


  getAllCatsFunc(): void {
    this.visible = true;
    this.cs.getAllCats().subscribe(
      (data) => {
        console.log(data)
        this.cats = data;
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }


  adopt(): void {
    //this.catId = document.getElementById("catId").innerText;
    console.log(document.getElementById("catId").textContent);
  }
}
