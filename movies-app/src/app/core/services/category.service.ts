import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Trace': 'true'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  add(item:any):Promise<string> {
    return new Promise((resolve,reject)=>{
      this.httpClient.post(`${APIEndpoint}/categories`, JSON.stringify(item), this.httpOptions).subscribe(data=>{
        resolve(data as string);
      },error=>{
        reject(error.error);
      });
    })
  }
  all():Promise<Array<string>> {
    return new Promise((resolve,reject)=>{
      this.httpClient.get(`${APIEndpoint}/categories`, this.httpOptions).subscribe(data=>{
        resolve(data as Array<string>);
      },error=>{
        reject(error.error);
      });
    })
  }
  delete(id:string):Promise<string> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.delete(`${APIEndpoint}/categories/${id}`, this.httpOptions).subscribe(data=>{
        resolve(data as string);
      },error=>{
        reject(error.error);
      });
    })
  }
}