import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient.model';
import { map } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { Vital } from '../Models/vital.model';
import { Symptom } from '../Models/symptom.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public showlist = true;
  public showedit = false;
  public  showadd = false;
  public showdetails = false;
  public showcreatesymptom = false;
  public showcreatevital = false;
  public showlistsymptom = false;
  patients: Patient[]=[];
  patient: Patient;
  vitals: Vital[]=[];
  vital: Vital;
  symptoms: Symptom[]=[];
  symptom: Symptom;
  private baseUrl = AppConfig.settings.apiServer.metadata+'m/patient';
  private baseUrlRest = AppConfig.settings.apiServer.metadata+'patients';
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
    this.patients=[];
    return this.http.get<Patient[]>(`${this.baseUrl}/`).pipe( map((dataX: Patient[]) => {
    for(let p of dataX){
      if(p.condition!=null && p.condition.toString()==="SEVERE"){
        this.patients.push(p);
      }
    }
    return this.patients;
  }));
  }
  getTreatedPatientsList() { 
    this.patients=[];
    return this.http.get<Patient[]>(`${this.baseUrl}/`).pipe( map((dataX: Patient[]) => {
    for(let p of dataX){
      if(p.priseencharge!=null && p.priseencharge.toString()!="AUCUNE"){
        this.patients.push(p);
      }
    }
    return this.patients;
  }));
  }

  getPatientVitalsList(id:number) { 
    this.vitals=[];
    return this.getPatientsList().pipe( map((data: Patient[]) => {
      this.patient=data.find(element => element.id == id);
      if(this.patient!=null&&this.patient.vitalsRecords!=null){
        this.vitals=this.patient.vitalsRecords;
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

  getPatientSymptomsList(id:number) { 
    this.symptoms=[];
    return this.getPatientsList().pipe( map((data: Patient[]) => {
      this.patient=data.find(element => element.id == id);
      if(this.patient!=null&&this.patient.symptomRecords!=null){
        this.symptoms=this.patient.symptomRecords;
      }
      console.log(this.symptoms);
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
