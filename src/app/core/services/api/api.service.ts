import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = environment.apiUrl;
  cloudApiUrl = environment.cloudApiUrl;
  //apiURL = "http://localhost:49488/api/";

  constructor(private http: HttpClient) { }

  public get<T>(url: string, params?:any ): Observable<T> {
    return this.http.get<T>(`${this.apiURL}${url}`,{params:params});
  }

  public post<T>(url: string, body:any): Observable<T> {
    return this.http.post<T>(`${this.apiURL}${url}`, body);
  }

  public put<T>(url: string, body:any): Observable<T> {
    return this.http.put<T>(`${this.apiURL}${url}`, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}${url}`);
  }

  public patch<T>(url: string, body: string): Observable<T> {
    return this.http.patch<T>(`${this.apiURL}${url}`, body);
  }
}