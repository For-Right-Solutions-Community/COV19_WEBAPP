import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Patient } from '../Models/patient.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  patients: Patient[];
  private baseUrl = environment.apiurl+'m/patient';
  private baseUrlRest = environment.apiurl+'patients';
  constructor(private http: HttpClient) { }

  getPatient(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrlRest}/${id}`);
  }

  createPatient(patient: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, patient);
  }

  updatePatient(id: number, patient: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{ responseType: 'text' });
  }

  getPatientsList() {
    return this.http.get<Patient[]>(`${this.baseUrl}/`);
  }

  getCriticalPatientsList() { 
    return this.http.get<Patient[]>(`${this.baseUrl}/`).pipe( map((dataX: Patient[]) => {
    for(let p of dataX){
      if(p.condition==1){
        this.patients.push(p);
      }
    }
    console.log(this.patients)
    return this.patients;
  }));
  }
}
