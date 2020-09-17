import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSave($event){
    console.log("CLICKED", $event);
    console.log((document.getElementById("FirstName") as HTMLInputElement).value);
    console.log((document.getElementById("LastName") as HTMLInputElement).value);
    console.log((document.getElementById("inputUsername") as HTMLInputElement).value);
    console.log((document.getElementById("userAge") as HTMLInputElement).value);
  }
}

// console.log((document.getElementById("inputPassword4") as HTMLInputElement).value);
