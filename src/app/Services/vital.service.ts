import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vital } from '../Models/vital.model';
import { AppConfig } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class VitalService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/vital';

  constructor(private http: HttpClient) { }

  getVital(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createVital(vital: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, vital);
  }

  updateVital(id: number, vital: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, vital);
  }

  deleteVital(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getVitalsList() {
    return this.http.get<Vital[]>(`${this.baseUrl}/`);
  }
}
