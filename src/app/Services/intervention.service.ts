import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Intervention } from '../Models/intervention.model';
@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  private baseUrl = environment.apiurl+'interventions';

  public showlist = true;
  public showadd = false ;
  public showdetails = false ;
  public showedit = false ;

  constructor(private http: HttpClient) { }

  getIntervention(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createIntervention(produit: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, produit);
  }

  updateIntervention(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteIntervention(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getInterventionsList() {
    return this.http.get<Intervention[]>(`${this.baseUrl}`);
  }
}
