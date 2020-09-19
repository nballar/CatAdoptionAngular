import { User } from './user';

export class Cat {
  catid:number;
  powerLevel: number;
  owner: User;
  adoptionStatus: boolean;

  constructor(catid: number, powerLevel: number, owner: User, adoptionStatus: boolean) {
    this.catid = catid;
    this.powerLevel = powerLevel;
    this.owner = owner;
    this.adoptionStatus = adoptionStatus;
  }
}
