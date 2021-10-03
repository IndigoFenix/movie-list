export interface Movie {
    '_id':string;
    'category':string;
    'title':string;
    'imdb':string | null;
    'link':string | null;
    'date':Date;
}