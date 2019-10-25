import { Component, OnInit } from '@angular/core';
import { PicDataService } from '../pic-data.service';
import { Photo } from "../pic.model";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.sass']
})
export class NaviComponent implements OnInit {

  //--------------------------- Variables

  jumpVisible: boolean = false;

  //--------------------------- Initialization
  constructor(public picDataService: PicDataService) { 

  }

  ngOnInit() {
  }


  //----------------------------- Methods

  public toggleJump(): void {
    this.jumpVisible = !this.jumpVisible;
  }

 

}
