import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NaviComponent } from './navi/navi.component';
import { DisplayComponent } from './display/display.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    DisplayComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    NaviComponent,
    DisplayComponent,
    CommentComponent]
})
export class AppModule { }
