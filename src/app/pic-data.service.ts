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

    public selectedIndex:number = 0;

    constructor(myHttp:HttpClient){
        this.http = myHttp;
    }   
    
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

  public select(index:number):void {
      this.selected = this.photos[index];
      this.selectedIndex = index;
  }

  public nextImg(): void {
    if(this.selectedIndex < this.photos.length) {
      this.selectedIndex += 1;
      this.select(this.selectedIndex);
      console.log("click!");
    }
  }

  public prevImg(): void {
    if(this.selectedIndex > 0) {
      this.selectedIndex -= 1;      
      this.select(this.selectedIndex);
    }
  }

  public getIndexString(): string {
    return this.selectedIndex.toString();
  }
  
} 

