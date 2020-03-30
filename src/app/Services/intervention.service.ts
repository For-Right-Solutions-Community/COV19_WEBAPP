import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Intervention } from '../Models/intervention.model';
@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  public showlist = true;
  public showedit = false;
  public showadd = false;
  public showdetails = false;
  private baseUrl = environment.apiurl+'intervention';
  constructor(private http: HttpClient) { }

  getIntervention(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createIntervention(intervention: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, intervention);
  }

  updateIntervention(id: number, intervention: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, intervention);
  }

  deleteIntervention(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getInterventionsList() {
    return this.http.get<Intervention[]>(`${this.baseUrl}/`);  }
}
