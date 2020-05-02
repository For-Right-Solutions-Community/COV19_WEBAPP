import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/events/async-deferredresult';
  longpollingtimeout = 60000*15;
  
  constructor(private http: HttpClient) { }

  getResponseFromServer() {
    return this.http.get<any>(`${this.baseUrl}`,
    { headers: new HttpHeaders({timeout: `${this.longpollingtimeout}`,'Access-Control-Allow-Origin':'*'}), responseType: 'text' as 'json'}).toPromise();
  }
}