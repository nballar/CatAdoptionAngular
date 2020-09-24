export class Catapi {

  CatId: string;
  CatPowerLevel: string;
  CatName: string;
  CatDescription: string;
  CatPersonality: string;
  CatImage: string;
  CatTaken: boolean;

  constructor(CatId: string, CatPowerLevel: string, CatName: string, CatDescription: string,
    CatPersonality: string, CatImage: string, CatTaken: boolean) {
    this.CatId = CatId;
    this.CatPowerLevel = CatPowerLevel;
    this.CatName = CatName;
    this.CatDescription = CatDescription;
    this.CatPersonality = CatPersonality;
    this.CatImage = CatImage;
    this.CatTaken = CatTaken;
  }
}
