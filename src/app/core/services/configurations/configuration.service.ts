import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from '../../models/configurations/configuration.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config : Configuration = new Configuration();
  constructor(private http: HttpClient) { 
    // this.config = <Configuration>pages;
  }
  getSettings(){
    return this.config;
  }
  getJSONwithAPI(){
    return this.http.get<Configuration>(`../../../assets/data/configuration.json`);
   }
}
