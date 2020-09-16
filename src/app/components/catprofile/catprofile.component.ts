import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetNekoService } from '../../services/getneko.service';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-catprofile',
  templateUrl: './catprofile.component.html',
  styleUrls: ['./catprofile.component.css']
})
export class CatprofileComponent implements OnInit {
  //@ViewChild('catId', { static: true }) private catIdRef: ElementRef<HTMLElement>;

  public cat: Cat = null;
  public input: string;
  public visible: boolean;
  public hide: boolean = false;
  public catId: string;
  public adoptBool: boolean = false;
  
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
        this.cats = data;
        console.log(data);
        for (let c in data) {
          
          if (this.adoptBool) {
            console.log("id of cat: " + c);
          }
        }
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }


  adopt(id:string): void {
    this.adoptBool = !this.adoptBool;
    console.log("in adopt button");
    //this.catId = document.getElementById("catId").innerText;
    //console.log("cat id right ?: "+ this.cat.CatId);
    //console.log("id of cat we adopt: " + <HTMLElement><unknown>document.getElementById("catId").innerText);
    // let value= ((document.getElementById("catId") as HTMLInputElement).value)
    console.log("cat id: " + ((document.getElementById("cat.CatId") as HTMLInputElement).value));
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.cats = this.cats.sort((low, high) => low.CatPowerLevel - high.CatPowerLevel);
          break;
        }

      case "High":
        {
          this.cats = this.cats.sort((low, high) => high.CatPowerLevel - low.CatPowerLevel);
          break;
        }
      case "None":
        {
          this.getAllCatsFunc();
          break;
        }
      }
    return this.cats;

    }
  
}
