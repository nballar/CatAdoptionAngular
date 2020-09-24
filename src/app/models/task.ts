import { User } from './user';

export class Task {
    public taskid:number;
    public description:String;
    public completionStatus:boolean;
    public frequency:number;
    public doer: User;

    constructor(taskid:number,description:String, completionStatus:boolean, frequency:number, doer: User){
        this.taskid = taskid,
        this.description = description,
        this.completionStatus=completionStatus,
        this.frequency=frequency,
        this.doer=doer
    }

    
}
