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
  public adoptBool: boolean = false;

  powerLevel: number;

  userid: number;
  user: string;
  userpts: number;
  
  taken: boolean;
  cats: Catapi[];
  adoptedCats: Cat[];

  constructor(private cs: GetNekoService, private router: Router, private as: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllCatsFunc();
    
  }
  /*getCats(): void {
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
  }*/


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
        //console.log(data);
        //console.log(this.adoptedCats);
        for (let c in this.cats) {
          //console.log("cat in api: " +this.cats[c].CatId);
          for (let ca in this.adoptedCats) {
            //console.log("cat in db: " +this.adoptedCats[ca].catid);
            if (Number(this.cats[c].CatId) == this.adoptedCats[ca].catid) {
              console.log("this cat " + c + " is adopted and should be hidden");
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

  //with this method, do we want to do an if statement that checks if the user had enough points to adopt the cat?-Nancy
  adopt(id: string, pl: string): void {
    this.adoptBool = !this.adoptBool;
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
      this.as.update(userObj).subscribe();
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
