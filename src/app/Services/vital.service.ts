import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vital } from '../Models/vital.model';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VitalService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  vitals: Vital[]=[];
  vital: Vital;
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

  getPatientVitalsList(id:number) { 
    return this.http.get<Vital[]>(`${this.baseUrl}/`).pipe( map((data: Vital[]) => {
    for(let s of data){
      if(s.patient!=null &&s.patient.id===id){
        this.vitals.push(s);
      }
    }
    return this.vitals;
  }));
  }

  getLastPatientVitals(id:number) { 
    return this.getPatientVitalsList(id).pipe( map((data: Vital[]) => {
      var mostRecentDate = new Date(Math.max.apply(null, data.map( s => {
      return new Date(s.measurementDate);

   })));
   this.vital = data.find( s => { 
    const d = new Date( s.measurementDate ); 
    return d.getTime() == mostRecentDate.getTime();
   }); 
    return this.vital;
  }));
  }
}
