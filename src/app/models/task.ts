export class Task {
    public tId:number;
    public name:String;
    public status:boolean;
    public frequency:number;

    constructor(tId:number, name:String, status:boolean, frequency:number){
        this.tId=tId,
        this.name=name,
        this.status=status,
        this.frequency=frequency
    }
}
