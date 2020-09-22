import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetNekoService } from '../../services/getneko.service';
import { Cat } from '../../models/cat';
import { User } from '../../models/user';
import { Router } from '@angular/router';

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
  public pointPrice: number;
  public adoptionStatus: boolean;
  public adoptBool: boolean = false;

  user: number;
  
  taken: boolean;
  cats: Cat[];
  adoptedCats: Cat[];

  constructor(private cs: GetNekoService, private router: Router) { }

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
        this.taken = false;
        console.log(data);
        for (let c in this.cats) {
           //console.log(c);
          for (let ca in this.adoptedCats) {
           // console.log(ca);
            if (c == ca) {
              console.log("this cat " + c + " is adopted and should be hidden");
              //does not match the id in the database like 1 and 2 are adopted which seem to be 0/1 in api
              //which is correct
              console.log(this.taken);
              this.taken = true;
              console.log(this.taken);
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
    this.pointPrice = Number(pl);
    console.log("cat id: " + this.catId + " power level " + this.pointPrice );
    //now we can fill the null part with the correct user ID==> user?
    //except power level was not persisted correctly
    let user = Number(sessionStorage.getItem('userid'));
    console.log(user);
    let cat = new Cat(this.catId, this.pointPrice, user, true);
    console.log(cat);
    this.cs.updateCat(cat).subscribe(
      (response: Cat) => {
        this.cat = response;
      }
    )
    //after they adopt the cat I think we want it to go to user profile
    //to show that in the profile that user owns that cat
    //this.router.navigate(['profile']);
    
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.cats = this.cats.sort((low, high) => low.pointPrice - high.pointPrice);
          break;
        }

      case "High":
        {
          this.cats = this.cats.sort((low, high) => high.pointPrice - low.pointPrice);
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
