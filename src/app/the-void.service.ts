import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { VoidMessage } from './void-message';



@Injectable({
  providedIn: 'root'
})
export class TheVoidService {
  private apiUrl = "http://the-void-api.sybrandt.com/throw-in-the-void";
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
    if(error.status === 0){
      return of({"error": "Failed to find The Void. Your message was lost."});
    }
    if("error" in error){
      return of(error.error);
    }
    return of({"error": "The Void produced a malformed mistake. Your message was lost."});
  }
}
