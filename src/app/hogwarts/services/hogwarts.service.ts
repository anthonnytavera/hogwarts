import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HogwartsService {
  env = environment;
  constructor(protected http: HttpClient) {}

  getCharacters(nameHouse: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.env.hogwarts_api}/house/${nameHouse}`)
      .pipe(catchError(this.handleError<any[]>('getCharacters', [])));
  }

  getStudents(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.env.hogwarts_api}/students`)
      .pipe(catchError(this.handleError<any[]>('getStudents', [])));
  }

  getTeachers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.env.hogwarts_api}/staff`)
      .pipe(catchError(this.handleError<any[]>('getTeachers', [])));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
