import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Symptom } from '../Models/symptom.model';
@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  private baseUrl = environment.apiurl+'m/symptom';

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
}
