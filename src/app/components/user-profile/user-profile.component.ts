import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { User } from '../../models/user';
import { Task } from '../../models/task';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: Number;
  user: User;
  tasks: Task[];
  constructor(private us: UserprofileService) { }

  ngOnInit(): void {
    this.getUserObj();
  }

  getUserObj() {
    this.userId = Number(sessionStorage.getItem('user'));
    this.us.getUser(this.userId).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
        console.log(this.user.tasks);
        console.log("in tasks");
        this.tasks = this.user.tasks;
        console.log(this.tasks);
      })
    
  }

  addTask($event){
    console.log("CLICK MEH!");
  }
}
