import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Localisation } from '../Models/localisation.model';
@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private baseUrl = environment.apiurl+'localisations';

  public showlist = true;
  constructor(private http: HttpClient) { }

  getLocalisationsList() {
    return this.http.get<Localisation[]>(`${this.baseUrl}`);
  }
}
