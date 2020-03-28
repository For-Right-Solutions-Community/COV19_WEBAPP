import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { JwtResponse } from '../models/jwt-response';
import { AuthLoginInfo } from '../models/login.model';
import { TokenStorageService } from './token-storage.service';
import { environment } from '../../../../environments/environment';

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
  private loginUrl = environment.apiurl+'/v2/register';
  
  constructor(private http: HttpClient,private storage:TokenStorageService) {
    
  }
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

}