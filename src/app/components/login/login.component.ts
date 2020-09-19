import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/models/userdto';
import { AuthenticationService } from '../../services/authentication.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username = '';
  password = '';
  invalidLogin = false;
  ud: Userdto;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }
 
  ngOnInit() {
  }
 
  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      (response: Userdto) => {
        this.ud = response;
      }
    );
  }
  
}
