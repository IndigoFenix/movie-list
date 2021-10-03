import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@core/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Trace': 'true'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  add(item:any):Promise<User> {
    return new Promise((resolve,reject)=>{
      this.httpClient.post(`${APIEndpoint}/user`, JSON.stringify(item), this.httpOptions).subscribe(data=>{
        resolve(data as User);
      },error=>{
        reject(error.error);
      });
    })
  }
  get(id:String):Promise<User> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.get(`${APIEndpoint}/user/${id}`, this.httpOptions).subscribe(data=>{
        resolve(data as User);
      },error=>{
        reject(error.error);
      });
    })
  }
  update(id:string,item:any):Promise<User> {
    return new Promise((resolve,reject)=>{
      this.httpClient.patch(`${APIEndpoint}/user/${id}`, JSON.stringify(item), this.httpOptions).subscribe(data=>{
        resolve(data as User);
      },error=>{
        reject(error.error);
      });
    })
  }
  all(query:any):Promise<Array<User>> {
    let querystring = '';
    if (query){
      let keys = Object.keys(query);
      let substrings = [];
      for (let i=0;i<keys.length;i++){
        if (query[keys[i]] !== null){
          substrings.push(keys[i]+'='+query[keys[i]]);
        }
      }
      if (substrings.length > 0){
        querystring = '?'+substrings.join('&');
      }
    }
    return new Promise((resolve,reject)=>{
      this.httpClient.get(`${APIEndpoint}/user`+querystring, this.httpOptions).subscribe(data=>{
        resolve(data as Array<User>);
      },error=>{
        reject(error.error);
      });
    })
  }
  delete(id:string):Promise<Array<User>> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.delete(`${APIEndpoint}/user/${id}`, this.httpOptions).subscribe(data=>{
        resolve(data as Array<User>);
      },error=>{
        reject(error.error);
      });
    })
  }
}
