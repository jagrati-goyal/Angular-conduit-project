import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://conduit.productionready.io/api';

  constructor(
    private http : HttpClient
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any>{
    return this.http.get(`${this.url}${path}`, { params });
  }

  post(path: string, body):Observable<any>{
    return this.http.post(`${this.url}${path}`, body);
  } 

  put(path: string, body): Observable<any>{
    return this.http.put(`${this.url}${path}`, JSON.stringify(body))
    .pipe(catchError(this.formatErrors));;
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
