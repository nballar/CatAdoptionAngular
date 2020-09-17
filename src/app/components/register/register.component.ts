import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // What I want here is to store the user input values as the new username and password.
  // BUUUUUT for now, it's breaking things, so I've commented it out.
  // username = (document.getElementById("username") as HTMLInputElement).value;
  // password = (document.getElementById("password") as HTMLInputElement).value;

  constructor() { }

  ngOnInit(): void {
  }

  onSave($event){


    // But hey, this part works now!!! I can log EVERYTHING without it breaking, yay!!!
    console.log("CLICKED", $event);
    console.log((document.getElementById("FirstName") as HTMLInputElement).value);
    console.log((document.getElementById("LastName") as HTMLInputElement).value);
    console.log((document.getElementById("inputUsername") as HTMLInputElement).value);
    console.log((document.getElementById("userAge") as HTMLInputElement).value);
  }
}

// console.log((document.getElementById("inputPassword4") as HTMLInputElement).value);
