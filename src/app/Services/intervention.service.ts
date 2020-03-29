import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Intervention } from '../Models/intervention.model';
import { map } from 'rxjs/operators';
import { Patient } from '../Models/patient.model';
@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  private baseUrl = environment.apiurl+'interventions';
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
    return this.http.get<Intervention[]>(`${this.baseUrl}`).pipe( map(data => {
        return data._embedded.interventions;
    })).pipe( map((dataX: Intervention[]) => {
      for(let intervention of dataX){
        this.http.get<Patient>(intervention._links.patient.href).subscribe(patient => {
          intervention.patient = patient as Patient;
         

        });
      }
      console.log(dataX)
      return dataX;
    }));
  }
}
