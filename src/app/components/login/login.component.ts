import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
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
  userid: number;
  userTemp: User;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }
 
  ngOnInit() {
  }
 
  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      (response: User) => {
        this.userTemp = response;
        response.points += 10;
        this.loginservice.update(response).subscribe();

        this.userid = this.userTemp.userid;
        sessionStorage.setItem('userid', JSON.stringify(this.userid));
        sessionStorage.setItem('user', JSON.stringify(this.userTemp));
        this.router.navigate(['homepage']);
      }
    );
    
    
  }      
     
}
