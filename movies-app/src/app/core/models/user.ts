export interface User {
    '_id':string;
    'name':string;
    'admin':boolean;
    'token':string | undefined;
}