import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { VoidMessage } from './void-message';



@Injectable({
  providedIn: 'root'
})
export class TheVoidService {
  private apiUrl = "http://localhost:5000/throw-in-the-void";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
   private http: HttpClient
  ) { }

  send(content:VoidMessage): Observable<VoidMessage> {
    return this.http.post<VoidMessage>(this.apiUrl, content, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<VoidMessage>{
    return of(error.error);
  }
}
