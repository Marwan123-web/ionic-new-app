import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  body: any;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  url: any = "http://192.168.1.5:3000";
  // url: any = "http://24-77-03-C3-F0-C4:3000";

  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(_id: string, password: string) {
    this.body = { _id, password };
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.http.post<any>(`${this.url}/login`, this.body, { headers: headers })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
