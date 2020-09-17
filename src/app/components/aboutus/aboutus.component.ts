import { Component, OnInit } from '@angular/core';
import { GetNekoService } from '../../services/getneko.service';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private catSer: GetNekoService) { }

  catModel:Cat;

  ngOnInit(): void {
    this.catSer.getCat("66").subscribe(
      data=>{
        this.catModel = data;
        console.log(this.catModel);
      },() => {
        console.log("error encountered");
      }
    );
  }

}
