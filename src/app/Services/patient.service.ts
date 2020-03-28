import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Patient } from '../Models/patient.model';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  private baseUrl = environment.apiurl+'patient';
  private baseUrlRest = environment.apiurl+'patients';
  constructor(private http: HttpClient) { }

  getPatient(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrlRest}/${id}`);
  }

  createPatient(patient: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, patient);
  }

  updatePatient(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,{ responseType: 'text' });
  }

  getPatientsList() {
    return this.http.get<Patient[]>(`${this.baseUrl}/`);
  }
}
