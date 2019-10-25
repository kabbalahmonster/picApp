import { Component, OnInit } from '@angular/core';

import { PicDataService } from '../pic-data.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.sass']
})
export class DisplayComponent implements OnInit {

  constructor(public picDataService: PicDataService) { }

  ngOnInit() {
  }

}
