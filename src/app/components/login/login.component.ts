import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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
  user: number;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }
 
  ngOnInit() {
  }
 
  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      (response: User) => {
        console.log(response);
        /*let u :User = JSON.parse('response');
        console.log(u.uId);*/
        this.user = response.userid;
       // console.log(this.user);
        sessionStorage.setItem('user', JSON.stringify(this.user));
        console.log(sessionStorage);
        this.router.navigate(['profile']);
      }
    );
  }
  
}
