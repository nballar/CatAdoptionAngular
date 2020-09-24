import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { GetNekoService } from '../../services/getneko.service';
import { User } from '../../models/user';
import { Task } from '../../models/task';
import { Cat } from '../../models/cat';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: Number;
  user: User;
  task: Task;
  tasks: Task[];
  cats: Cat[];
  catIds: number[] = [];
  ownedCats: TempCat[] = [];

  taskStatus: any;

  input: String;
  constructor(private us: UserprofileService, private cs: GetNekoService, private as: AuthenticationService) { }

  ngOnInit(): void {
    this.getUserObj();
  }

  getUserObj() {
    this.userId = Number(sessionStorage.getItem('userid'));
    this.us.getUser(this.userId).subscribe(
      (data) => {
        this.user = data;
        // console.log(this.user);
        // console.log(this.user.tasks);
        // console.log("in tasks");
        this.tasks = this.user.tasks;

        let index:number = 0;
        for (let c of this.user.cats){
          this.catIds.push(c.catid);

        }
        this.showCats();

        // console.log(this.tasks);
      })
  }

  addTask(){
    console.log("CLICK MEH!");
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.task = new Task(0,this.input, false, 1, this.user);
    console.log(this.task);
    this.us.addTask(this.task).subscribe();
    location.reload();

   
  }

  showCats(){
    console.log(this.catIds);

    for(let i of this.catIds){
      this.cs.getCat(String(i)).subscribe(
        (data) => {
          let t = new TempCat(data.CatImage,data.CatName);
          this.ownedCats.push(t);
        }
      )
    }

    console.log(this.ownedCats);

  }

  markComplete(event) {
    console.log(event);
    console.log("in mark complete method")
    if (event.target.checked) {
      console.log(event.target.value);
      for (let t in this.tasks) {
        // console.log(this.tasks[t].taskid);
        if (this.tasks[t].taskid == event.target.value) {
          console.log(this.tasks[t].completionStatus);
          console.log(this.tasks[t].taskid + " should be marked as complete");
          this.tasks[t].completionStatus = true;
          console.log(this.tasks[t].completionStatus);
          console.log(this.tasks[t]);
          let nt = new Task(this.tasks[t].taskid, this.tasks[t].description, this.tasks[t].completionStatus, this.tasks[t].frequency, this.user);
          console.log(nt);
          this.us.updateTask(nt).subscribe();

          console.log(this.user);
          console.log(this.user.points);

          this.user.points += 20;

          console.log(this.user.points);
          console.log(this.user);

          this.as.update(this.user).subscribe(
            (data) => {
              sessionStorage.removeItem('user');
              let user = sessionStorage.setItem('user', JSON.stringify(this.user));
              console.log(user);
            }
          )
        }
      }
    }
     

      //this.getUserObj();
    }
  }

export class TempCat {
  private img:string;
  private name:string;
  constructor(img:string, name:string) {
    this.img = img;
    this.name = name;

  }
}
