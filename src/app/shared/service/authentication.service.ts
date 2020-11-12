import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _connected: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  login(data): Observable<any>{
    console.log(data)
    return this.http.post<any>('http://localhost:4000/users/authenticate', data, {responseType: 'json'})
    .pipe(
      tap(result => {
        const user: any = result;
        if (user.token != null || user.token != undefined) {
          this._connected.next(true);
        }
      }),
      catchError(this.errorService.handleError('login', []))
    )
  }
}
