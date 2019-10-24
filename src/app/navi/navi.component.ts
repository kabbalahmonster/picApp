import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.sass']
})
export class NaviComponent implements OnInit {

  //--------------------------- Variables

  jumpVisible: boolean = false;
  currentImg: number = 0;
  galleryLength: number;

  //--------------------------- Initialization
  constructor() { 

    this.galleryLength = 2;

  }

  ngOnInit() {
  }


  //----------------------------- Methods

  public toggleJump(): void {
    this.jumpVisible = !this.jumpVisible;
  }

  public nextImg(): void {
    if(this.currentImg < this.galleryLength) {
      this.currentImg += 1;
    }
  }

  public prevImg(): void {
    if(this.currentImg > 0) {
      this.currentImg -= 1;
    }
  }
}
