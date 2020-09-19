import { Component, OnInit } from '@angular/core';
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

  constructor(private rs:RegisterService) { }

  ngOnInit(): void {
  }

  onSave($event){

    // But hey, this part works now!!! I can log EVERYTHING without it breaking, yay!!!
    console.log("CLICKED", $event);

    this.firstName = (document.getElementById("FirstName") as HTMLInputElement).value;
    this.lastName = (document.getElementById("FirstName") as HTMLInputElement).value;
    this.username = (document.getElementById("inputUsername") as HTMLInputElement).value;
    this.password = (document.getElementById("inputPassword4") as HTMLInputElement).value;
    this.age =+ (document.getElementById("userAge") as HTMLInputElement).value;


    let u = new User(0, this.username, this.password, this.firstName, this.lastName, null, this.age, 10, null, null)
    this.rs.addUser(u).subscribe(
      (response:User) =>{
        this.user = response;
      }
    )

    console.log((document.getElementById("FirstName") as HTMLInputElement).value);
    console.log((document.getElementById("LastName") as HTMLInputElement).value);
    console.log((document.getElementById("inputUsername") as HTMLInputElement).value);
    console.log((document.getElementById("userAge") as HTMLInputElement).value);

  }
}