import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Intervention } from '../Models/intervention.model';
import { AppConfig } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  public showlist = true;
  public showedit = false;
  public showadd = false;
  public showdetails = false;
  interventions: Intervention[]=[];
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/intervention';
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

    getPatientInterventionsList(id:number) { 
      this.interventions=[];
      return this.getInterventionsList().pipe( map((data: Intervention[]) => {
        this.interventions=data.filter(element => element.patient.id == id);
        console.log(this.interventions);
      return this.interventions;
    }));
    }
}
