import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login.model';
import { TokenStorageService } from './token-storage.service';
import { User } from '../../../@core/data/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
observe:'body'},
)
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //dev mode
  private loginUrl = 'http://192.168.1.121:9090/api/auth/signin';
  private signupUrl = 'http://192.168.1.121:9090/api/auth/signup';
  private bdUrl='http://192.168.1.121:9090/api/auth/users/';

  //prod mode 
 /* private loginUrl = 'http://mobiauth.frsdev.ovh/api/auth/signin';
  private signupUrl = 'http://mobiauth.frsdev.ovh/api/auth/signup';
  private bdUrl='http://mobiauth.frsdev.ovh/api/auth/users/';*/

  
 
  constructor(private http: HttpClient,private storage:TokenStorageService) {
    
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
 
  signUp(info: User): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

}