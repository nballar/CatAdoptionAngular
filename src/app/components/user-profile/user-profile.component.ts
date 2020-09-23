import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../../services/userprofile.service';
import { GetNekoService } from '../../services/getneko.service';
import { User } from '../../models/user';
import { Task } from '../../models/task';
import { Cat } from '../../models/cat';

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

  input: String;
  constructor(private us: UserprofileService, private cs: GetNekoService) { }

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
    //this.user = sessionStorage.getItem("user"));

    this.task = new Task(this.input, false, 1, null);
    console.log(this.task);
    this.us.addTask(this.task).subscribe();
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

}

export class TempCat {
  private img:string;
  private name:string;
  constructor(img:string, name:string) {
    this.img = img;
    this.name = name;

  }
}
