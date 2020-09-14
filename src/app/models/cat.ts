export class Cat {
  CatId:string;
  CatName:string;
  CatDescription:string;
  CatPersonality:string;
  CatPowerLevel:any;
  CatType:string;
  Memento:string;
  CatImage:string;
  MementoImage:string;

  constructor(
        CatId:string,
        CatName:string,
        CatDescription:string,
        CatPersonality:string,
        CatPowerLevel:any,
        CatType:string,
        Memento:string,
        CatImage:string,
        MementoImage:string)
        {
            this.CatId = CatId;
            this.CatName = CatName;
            this.CatDescription = CatDescription;
            this.CatPersonality = CatPersonality;
            this.CatPowerLevel = CatPowerLevel;
            this.CatType = CatType;
            this.Memento = Memento;
            this.CatImage = CatImage;
            this.MementoImage = MementoImage;
        }
}
