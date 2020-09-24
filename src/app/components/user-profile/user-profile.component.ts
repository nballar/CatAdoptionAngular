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
 /*
 This component is where the user can see their profile details
 username, name, age, and points as well as their list of cats they have adopted
 and this is also where they manage their tasks that will help them gain points upon completion
*/
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
  /**
   * getUserObj()
   * 1.uses the stored user from login to get the user from the server
   * in order to get the users cats they adopted and their tasks
   * 2. the showcats() function is send called
   * */
  getUserObj() {
    this.userId = Number(sessionStorage.getItem('userid'));
    this.us.getUser(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.tasks = this.user.tasks;

        let index:number = 0;
        for (let c of this.user.cats){
          this.catIds.push(c.catid);

        }
        this.showCats();
      })
  }
  /** addTask()
   * 1. adds a new task to the database based on usr information
   * 2. the page is reloaded to show the change
   * 
   * */
  addTask(){
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.task = new Task(0,this.input, false, 1, this.user);
    this.us.addTask(this.task).subscribe();
    location.reload();
  }

  
  /** showCats() displays cats that the user has adopted
   *
   * */
  showCats() {
    for (let i of this.catIds) {
      this.cs.getCat(String(i)).subscribe(
        (data) => {
          let t = new TempCat(data.CatImage, data.CatName);
          this.ownedCats.push(t);
        }
      )
    }

  }

  /**
   *
   * @param event acknowledges which checkbox has been checked
   * markComplete(): marks task as completes and updates necessary information
   * 1. varifies the status of the event (whether checkbox is checked)
   * 2. loops through the tasks in the user's list of tasks
   * 3. checks each of the tasks in the list against the id of the "event"/ checkbox that was checked
   * 4. sets the task as completed, updates the tas
   * 5. increase user points by 20 for completing a task and updates user
   */
  markComplete(event) {
    
    if (event.target.checked) {
      for (let t in this.tasks) {
        if (this.tasks[t].taskid == event.target.value) {
          this.tasks[t].completionStatus = true;
          let newTask = new Task(this.tasks[t].taskid, this.tasks[t].description, this.tasks[t].completionStatus, this.tasks[t].frequency, this.user);
          this.us.updateTask(newTask).subscribe();
          this.user.points += 20;
          this.as.update(this.user).subscribe(
            (data) => {
              sessionStorage.removeItem('user');
              let user = sessionStorage.setItem('user', JSON.stringify(this.user));
            }
          )
        }
      }
    }
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
