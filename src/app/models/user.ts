import { Cat } from './cat';
import { Task } from './task';

export class User {
    public userid:number;
    public username:String;
    public password:String;
    public firstName:String;
    public lastName:String;
    public profileImage:String;
    public age:number;
    public points:number;
    public cats:Array<Cat>
    public tasks:Array<Task>

    constructor(
        userid:number,
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        profileImage:String,
        age:number,
        points:number,
        cats:Array<Cat>,
        tasks:Array<Task>)
        {
            this.userid = userid,
            this.username=username,
            this.password=password,
            this.firstName=firstName,
            this.lastName=lastName,
            this.profileImage=profileImage,
            this.age=age,
            this.points=points,
            this.cats=cats,
            this.tasks=tasks
        }
}
