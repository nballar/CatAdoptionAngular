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

  input: string;
  visible: boolean;
  hide: boolean = false;

  cat: Cat = null;
  catId: number;
  pointPrice: number;
  adoptionStatus: boolean;
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
 /**
  * getAllCatsFunc():
  *   1. gets list of adopted cats from server
  *   2. gets list of cats from Neko atsume Api
  *   3. the double for loop loops through both the lists and checks the API cats
  *   against the adopeed cats and acknowledges which cats are adopted
  *   in order to alter the view depenedent on if the cat is "taken" (adopted) or not
  * */

  getAllCatsFunc(): void {
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
          for (let ca in this.adoptedCats) {
            if (Number(this.cats[c].CatId) == this.adoptedCats[ca].catid) {
              this.cats[c].CatTaken = true;
            
              }
            }
        }
      },
      () => {
        this.cat = null;
        console.log("Something went wrong");
      }
    )
  }
  /**
   * Adopt() is called on button press from the html template
   * 1. takes in the id of the user that is pressing the button and the powerlevel
   * (which is what we determine as the cost) of the cat the user is trying to adopt.
   * 2. the user that we stored at login is parsed in order to be able to manipulate the user points
   * 3. can the user adopt?
     * if the cost of the cat is greater than amount of points the user had then an alert message is sent
     * notifying the user that they are not able to adopt this cat.
     *
     * else if the user does have enough points the cat that is adopted is sent back to the server to add
     * to the database and acknowlegde their new adoption status.
     * and the user points are decreased based on the cost of the cat. The user is updated.
     * 
   * 4. we send the user to the user profile component to see their updated points and their new cat.
   */ 
  adopt(id: string, pl: string): void {
    this.catId = Number(id);
    this.pointPrice = Number(pl);
    
    let userid = Number(sessionStorage.getItem('userid'));
    let user = sessionStorage.getItem('user');
    let userObj = JSON.parse(user);
    this.userpts = userObj.points;
    
    if (this.pointPrice > this.userpts) {
      alert("You do not have enough points to adopt this kitty. ");
    }
    else {

        let cat = new Cat(this.catId, this.pointPrice, userid, true);
        
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
          
        }
    );
      this.router.navigate(['profile']);
    }
  }

  /**
   * 
   * @param event : the event choice of the user
   *
   * sort(event): sorts the cats in this page based on the price.
   * the user has 3 options
   * no sorting
   * sorting low to high
   * sorting high to low
   */
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
