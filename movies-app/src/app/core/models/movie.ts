export interface Movie {
    '_id':string;
    'category':string;
    'title':string;
    'imdb':string | null;
    'poster':string | null;
    'date':Date;
}