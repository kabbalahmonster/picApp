import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JSONRoot} from "./pic.model";
import {Photo} from "./pic.model";

@Injectable({
  providedIn: 'root'
})
export class PicDataService {
  //------------------- Variables

  //----Http
  private http:HttpClient;
  private readonly RETRIEVE_SCRIPT: string = "http://www.seanmorrow.ca/_lessons/retrieveAlbum.php?id=w0419574&count=11";

  public photos: Photo[];


  public loaded:boolean = false;

    public selected:Photo;

    constructor(myHttp:HttpClient){
        this.http = myHttp;
    }   
    
    public load():void {
        console.log("loading data!");
        this.http.get<JSONRoot>(this.RETRIEVE_SCRIPT).subscribe(
            data => {
                //console.log(JSON.stringify(data));
                // get JSON root object
                let json:JSONRoot = data;
                // set public property to samples array of json
                this.photos = json.photos;
                console.log("test: " + this.photos.length);

                // target the FIRST sample in the array by default
                this.selected = this.photos[0];

                // this is done loading!
                this.loaded = true;

            },
            err => {
                console.log("Error retrieving portfolio data :(");
            }
        );        
    }

  public select(index:number):void {
      this.selected = this.photos[index];
  }

} 


