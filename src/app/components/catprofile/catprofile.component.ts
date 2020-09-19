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
  public catId: number;
  public powerLevel: number;
  public adoptionStatus: boolean;
  public adoptBool: boolean = false;
  
  taken: boolean;
  cats: Cat[];
  adoptedCats: Cat[];

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
    //method that gets all the cats in the backend (which are adopted)
    //loop through that list and check against get all cats and if it
    //is in the catAdopted list then do not display somehow

    this.cs.getAdoptedCats().subscribe(
      (data) => {
        this.adoptedCats = data;
      }
    )
    this.cs.getAllCats().subscribe(
      (data) => {
        this.cats = data;
        console.log(data);
        for (let c in data) {
            for (let ca in this.adoptedCats) {
              if (data[c].catid == data[ca].catid) {
                this.taken = true;  
              }
            }
          /*if (this.adoptBool) {
            console.log("id of cat: " + data[c].catid);
          }*/
        }
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }


  adopt(id: string, pl: string): void {
    this.adoptBool = !this.adoptBool;
    console.log("in adopt button");
    this.catId = Number(id);
    this.powerLevel = Number(pl);
    console.log("cat id: " + this.catId + " power level " + this.powerLevel);
    let cat = new Cat(this.catId, this.powerLevel, null, true);
    this.cs.updateCat(cat).subscribe(
      (response: Cat) => {
        this.cat = response;
      }
    )
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.cats = this.cats.sort((low, high) => low.powerLevel - high.powerLevel);
          break;
        }

      case "High":
        {
          this.cats = this.cats.sort((low, high) => high.powerLevel - low.powerLevel);
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
