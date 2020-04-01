import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Localisation } from '../Models/localisation.model';
import { AppConfig } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private baseUrl = AppConfig.settings.apiServer+'locations';
  constructor(private http: HttpClient) { }

  getLocalisationsList() {
    return this.http.get<Localisation[]>(`${this.baseUrl}`);
  }
}
