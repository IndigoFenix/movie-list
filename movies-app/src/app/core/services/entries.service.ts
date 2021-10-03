import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Movie } from '@core/models/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Trace': 'true'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  add(item:any):Promise<Movie> {
    return new Promise((resolve,reject)=>{
      this.httpClient.post(`${APIEndpoint}/movie`, JSON.stringify(item), this.httpOptions).subscribe(data=>{
        resolve(data as Movie);
      },error=>{
        reject(error.error);
      });
    })
  }
  get(id:String):Promise<Movie> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.get(`${APIEndpoint}/movie/${id}`, this.httpOptions).subscribe(data=>{
        resolve(data as Movie);
      },error=>{
        reject(error.error);
      });
    })
  }
  update(id:string,item:any):Promise<Movie> {
    return new Promise((resolve,reject)=>{
      this.httpClient.patch(`${APIEndpoint}/movie/${id}`, JSON.stringify(item), this.httpOptions).subscribe(data=>{
        resolve(data as Movie);
      },error=>{
        reject(error.error);
      });
    })
  }
  all(query:any):Promise<Array<Movie>> {
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
      this.httpClient.get(`${APIEndpoint}/movie`+querystring, this.httpOptions).subscribe(data=>{
        resolve(data as Array<Movie>);
      },error=>{
        reject(error.error);
      });
    })
  }
  delete(id:string):Promise<Array<Movie>> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.delete(`${APIEndpoint}/movie/${id}`, this.httpOptions).subscribe(data=>{
        resolve(data as Array<Movie>);
      },error=>{
        reject(error.error);
      });
    })
  }
}