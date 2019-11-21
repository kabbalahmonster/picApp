import { Component, OnInit } from '@angular/core';

import { PicDataService } from '../pic-data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})
export class CommentComponent implements OnInit {


  

  constructor(public picDataService: PicDataService) {}
  ngOnInit() {}
}
