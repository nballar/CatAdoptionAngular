
export class Cat {
  catid:number;
  pointPrice: number;
  owner: number;
  adoptionStatus: boolean;

  constructor(catid: number, pointPrice: number, owner: number, adoptionStatus: boolean) {
    this.catid = catid;
    this.pointPrice = pointPrice;
    this.owner = owner;
    this.adoptionStatus = adoptionStatus;
  }
}
