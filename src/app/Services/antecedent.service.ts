import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antecedent } from '../Models/antecedent.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AntecedentService {

  private baseUrl = environment.apiurl+'antecedents';

  public showlist = true;
  public showadd = false ;
  public showdetails = false ;
  public showedit = false ;

  constructor(private http: HttpClient) { }

  getAntecedent(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAntecedent(produit: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, produit);
  }

  updateAntecedent(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAntecedent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAntecedentsList() {
    return this.http.get<Antecedent[]>(`${this.baseUrl}`);
  }
}
