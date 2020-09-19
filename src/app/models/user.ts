import { Cat } from './cat';
import { Task } from './task';

export class User {
    public uId:number;
    public username:String;
    public password:String;
    public firstName:String;
    public lastName:String;
    public profilePic:String;
    public age:number;
    public points:number;
    public cats:Array<Cat>
    public tasks:Array<Task>

    constructor(
        uId:number,
        username:String,
        password:String,
        firstName:String,
        lastName:String,
        profilePic:String,
        age:number,
        points:number,
        cats:Array<Cat>,
        tasks:Array<Task>)
        {
            this.uId=uId,
            this.username=username,
            this.password=password,
            this.firstName=firstName,
            this.lastName=lastName,
            this.profilePic=profilePic,
            this.age=age,
            this.points=points,
            this.cats=cats,
            this.tasks=tasks
        }
}
