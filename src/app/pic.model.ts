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
