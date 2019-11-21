export interface JSONRoot {
    photos: Photo[];
}

export interface Photo {
    _id:       string;
    title:    string;
    caption:  string;
    source:   string;
    comments: any[];
}

export interface Comment {
    photoId: string;
    author: string;
    comment: string;    
}