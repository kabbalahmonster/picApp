/*
  Photo Gallery Data Service
  Nick Showalter
  2019
*/

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JSONRoot} from "./pic.model";
import {Photo} from "./pic.model";
import {Comment} from "./pic.model";
//---------------------------------------
@Injectable({
  providedIn: 'root'
})
export class PicDataService {
  //========================= Variables

  //----Http
  private http:HttpClient;
  private readonly RETRIEVE_SCRIPT: string = "http://127.0.0.1:8088/get";
  private readonly UPDATE_SCRIPT: string = "http://127.0.0.1:8088/put";
  //---- Objects and Attributes
  public photos: Photo[];  
  public loaded:boolean = false;
  public selected:Photo;
  public selectedIndex:number = 0;
  private myComment: Comment = ({photoId: "",
                                author: "",
                                comment: ""});
  //------------------------------- constructor 
  constructor(myHttp:HttpClient){new Comment
      this.http = myHttp;
  }
  //========================================== http request methods
  // --------------------- load and prepare data
  public load():void {
      console.log("loading data!");
      this.http.get<JSONRoot>(this.RETRIEVE_SCRIPT).subscribe(
          data => {
              console.log(JSON.stringify(data));
              // get JSON root object
              let json:JSONRoot = data;
              // set public property to samples array of json
              this.photos = json.photos;
              console.log("test: " + this.photos.length);

              // target the FIRST sample in the array by default
              this.selectedIndex = 0;
              this.selected = this.photos[this.selectedIndex];

              // this is done loading!
              this.loaded = true;

          },
          err => {
              console.log("Error retrieving photo data :(");
          }
      );
  }
    
  // --------------------send new comment data via PUT request
  public sendUpdate(putData: {author: string, comment: string}): void {
    this.myComment.photoId = this.selected._id;
    console.log("selected id : " + this.selected._id);
    this.myComment.author = putData.author;
    this.myComment.comment = putData.comment; 
    console.log(this.selected );
    console.log(this.myComment);   
    
    this.http.put(this.UPDATE_SCRIPT, this.myComment).subscribe(
      data =>{
        console.log(data);
      },
      err => {
        console.log(err);
      }

    );

  }
// ===========================================picture navigation
  // -----------------set current photo by index reference
  public select(index:number):void {
      this.selectedIndex = Number(index);
      this.selected = this.photos[this.selectedIndex];
  }

  // ------------------move the selected index reference + 1
  public nextImg(): void {
    if(this.selectedIndex < this.photos.length) {
      this.selectedIndex += 1;
      this.select(this.selectedIndex);
      console.log("click!");
    }
  }

  // -------------------move the selected index reference - 1
  public prevImg(): void {
    if(this.selectedIndex > 0) {
      this.selectedIndex -= 1;
      this.select(this.selectedIndex);
    }
  }

  // ------------------return index number of selected
  public getIndexString(): string {
    return this.selectedIndex.toString();
  }

  // ------------------return a string path to image source
  public getPath(strSource : string = this.selected.source):string{
    let pathString: string = `../assets/photos/${strSource}`;
    console.log(pathString);
    return pathString;
  }

}


