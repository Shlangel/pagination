import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User, UserResponse } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  getUsersData(page: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`https://reqres.in/api/users?page=${page}`)
    .pipe(
      catchError((err) => this.handleError<UserResponse>('getUsers', err))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`https://reqres.in/api/users/${id}`)
    .pipe(
      map((data: any) => data.data),
      catchError(this.handleError<User>(`getUsers id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      alert(`${operation} failed`);

      return of(result as T);
    };
  }

}
