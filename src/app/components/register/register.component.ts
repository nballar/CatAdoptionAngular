import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstName:String;
  public lastName:String;
  public username:String;
  public password:String;
  public age:number;

  user:User;

  constructor(private rs:RegisterService, private router: Router) { }

  hoverText = ["Cocoa","Dottie","Gabriel","Ginger",
  "Marshmallow","Peaches"];


  catprofilepic = ["../../../assets/cocoa.png",
                  "../../../assets/dottie.png",
                  "../../../assets/gabriel.png",
                  "../../../assets/ginger.png",
                  "../../../assets/marshmallow.png",
                  "../../../assets/peaches_body.png"];

  ngOnInit(): void {
  }

  onSave(){
    this.firstName = (document.getElementById("FirstName") as HTMLInputElement).value;
    this.lastName = (document.getElementById("LastName") as HTMLInputElement).value;
    this.username = (document.getElementById("inputUsername") as HTMLInputElement).value;
    this.password = (document.getElementById("inputPassword4") as HTMLInputElement).value;
    this.age =+ (document.getElementById("userAge") as HTMLInputElement).value;

    let e = (document.getElementById("profileSelection") as HTMLInputElement).value;
    let profile = this.catprofilepic[e];

    let u = new User(0, this.username, this.password, this.firstName, this.lastName, profile, this.age, 10, null, null)
    this.rs.addUser(u).subscribe(
      (response:User) =>{
        this.user = response;
        alert("Please log in now with your new account.");
        this.router.navigate(['login']);
      }
    );
  }

}
