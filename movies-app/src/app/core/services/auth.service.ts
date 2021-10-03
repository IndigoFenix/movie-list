import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@core/models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Trace': 'true'
    })
  }

  constructor(private httpClient: HttpClient) { }

  login(name:string,pass:string): Promise<User> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.post(`${APIEndpoint}/auth`, JSON.stringify({'name':name,'pass':pass}), this.httpOptions).subscribe(data=>{
        this.user = data as User;
        if (this.user.token){
          sessionStorage.setItem('USER_ID', this.user._id);
          sessionStorage.setItem('TOKEN', this.user.token);
          sessionStorage.setItem('USER',JSON.stringify(this.user));
        }
        resolve(this.user);
      },error=>{
        reject(error.error);
      });
    })
  }

  signup(name:string,pass:string): Promise<User> { 
    return new Promise((resolve,reject)=>{
      this.httpClient.post(`${APIEndpoint}/user`, JSON.stringify({'name':name,'pass':pass}), this.httpOptions).subscribe(data=>{
        this.user = data as User;
        if (this.user.token){
          sessionStorage.setItem('USER_ID', this.user._id);
          sessionStorage.setItem('TOKEN', this.user.token);
          sessionStorage.setItem('USER',JSON.stringify(this.user));
        }
        resolve(this.user);
      },error=>{
        reject(error.error);
      });
    })
  }

  logout(){
    this.user = null;
    sessionStorage.removeItem('USER_ID');
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('USER');
  }

  //This stores the current user data.
  getUser(){
    if (this.user) return this.user;
    else if (sessionStorage.getItem('USER')){
      this.user = JSON.parse(sessionStorage.getItem('USER')) as User;
      return this.user;
    } else {
      return null;
    }
  }
}
