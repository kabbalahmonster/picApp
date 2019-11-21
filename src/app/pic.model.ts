export interface JSONRoot {
    photos: Photo[];
}

export interface Photo {
    id:       string;
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