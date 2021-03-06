import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppUser } from '../Models/user.model';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/user';
  private baseUrlRest = AppConfig.settings.apiServer.metadata+'users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrlRest}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }
  createBenevolent(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createbenevolent`, user);
  }
  createSamu(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createsamu`, user);
  }
  createAdmin(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createadmin`, user);
  }

  updateUser(id: number, user: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUsersList() {
    return this.http.get<AppUser[]>(`${this.baseUrl}/`);
  }
}
