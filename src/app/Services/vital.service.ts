import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vital } from '../Models/vital.model';
@Injectable({
  providedIn: 'root'
})
export class VitalService {

  private baseUrl = environment.apiurl+'vitals';

  public showlist = true;
  public showadd = false ;
  public showdetails = false ;
  public showedit = false ;

  constructor(private http: HttpClient) { }

  getVital(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createVital(produit: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, produit);
  }

  updateVital(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteVital(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getVitalsList() {
    return this.http.get<Vital[]>(`${this.baseUrl}`);
  }
}
