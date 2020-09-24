import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GetNekoService } from '../../services/getneko.service';
import { Cat } from '../../models/cat';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserprofileService } from '../../services/userprofile.service';
import { Catapi } from '../../models/catapi';
import { AuthenticationService } from '../../services/authentication.service';

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

  powerLevel: number;

  userid: number;
  user: string;
  userpts: number;
  
  cats: Catapi[];
  adoptedCats: Cat[];

  constructor(private cs: GetNekoService, private router: Router, private as: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCatsFunc();
    
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
        for (let c in this.cats) {
          this.cats[c].CatTaken = false;
          //console.log(this.cats[c].CatTaken);
          //console.log("cat in api: " +this.cats[c].CatId);
          for (let ca in this.adoptedCats) {
            //console.log("cat in db: " +this.adoptedCats[ca].catid);
            if (Number(this.cats[c].CatId) == this.adoptedCats[ca].catid) {
              console.log("this cat " + c + " is adopted and should be hidden");
              this.cats[c].CatTaken = true;
              console.log(this.cats[c].CatTaken);
              }
            }
        }
      },
      () => {
        this.cat = null;
        console.log("something went wrong");
      }
    )
  }

  //with this method, do we want to do an if statement that checks if the user had enough points to adopt the cat?-Nancy
  adopt(id: string, pl: string): void {
    console.log("in adopt button");
    this.catId = Number(id);
    this.pointPrice = Number(pl);
    console.log("cat id: " + this.catId + " power level " + this.pointPrice );
    //check if user has enough points to adopt
    let userid = Number(sessionStorage.getItem('userid'));
    let user = sessionStorage.getItem('user');
    let userObj = JSON.parse(user);
    this.userpts = userObj.points;
    console.log(this.userpts);
    //check points of user against cost;
    if (this.pointPrice > this.userpts) {
      alert("you do not have enough points to adopt this kitty. ");
    }
    else {

        let cat = new Cat(this.catId, this.pointPrice, userid, true);
        console.log(cat);
        this.cs.updateCat(cat).subscribe(
          (response: Cat) => {
            this.cat = response;
          }
      )
      userObj.points -= this.pointPrice;
      this.as.update(userObj).subscribe(
        (data) => {
          sessionStorage.removeItem('user');
          let user = sessionStorage.setItem('user', JSON.stringify(userObj));
          console.log(user);
        }
    );
      this.router.navigate(['profile']);
    }
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {         
          this.cats = this.cats.sort((low, high) => Number(low.CatPowerLevel) - Number(high.CatPowerLevel));
          break;
        }

      case "High":
        {
          this.cats = this.cats.sort((low, high) => Number(high.CatPowerLevel) - Number(low.CatPowerLevel));
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
