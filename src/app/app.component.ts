import { Component, OnInit } from '@angular/core';
import { PicDataService } from './pic-data.service';
//import {Pic} from "./pic.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'picApp';

  constructor(public picDataService: PicDataService){
    
    this.picDataService.load();
  }


  
  ngOnInit(): void {

    console.log(this.picDataService);
     

  }


}
