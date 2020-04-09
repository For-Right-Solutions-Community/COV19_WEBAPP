import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Symptom } from '../Models/symptom.model';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  symptoms: Symptom[]=[];
  symptom: Symptom;
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/symptom';

  constructor(private http: HttpClient) { }

  getSymptom(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSymptom(symptom: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, symptom);
  }

  updateSymptom(id: number, symptom: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, symptom);
  }

  deleteSymptom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getSymptomsList() {
    return this.http.get<Symptom[]>(`${this.baseUrl}/`);
  }

  getPatientSymptomsList(id:number) { 
    return this.http.get<Symptom[]>(`${this.baseUrl}/`).pipe( map((data: Symptom[]) => {
    console.log(data);
    for(let s of data){
      if(s.patient!=null &&(s.patient.id===id)){
        console.log(s);
        this.symptoms.push(s);
      }
    }
    return this.symptoms;
  }));
  }

  getLastPatientSymptoms(id:number) { 
    return this.getPatientSymptomsList(id).pipe( map((data: Symptom[]) => {
      var mostRecentDate = new Date(Math.max.apply(null, data.map( s => {
      return new Date(s.date);

   })));
   this.symptom = data.find( s => { 
    const d = new Date( s.date ); 
    return d.getTime() == mostRecentDate.getTime();
   });
    return this.symptom;
  }));
  }
}
