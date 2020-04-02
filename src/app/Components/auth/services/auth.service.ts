import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login.model';
import { TokenStorageService } from './token-storage.service';
import { AppConfig } from '../../../app.config';

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
  private loginUrl = AppConfig.settings.apiServer.metadata+'v2/register';
  
  constructor(private http: HttpClient,private storage:TokenStorageService) {
    
  }
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

}