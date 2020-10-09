import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Login;

  server = 'https://localhost:5001/';
  apiLoginUrl = 'api/loginclient/login2/';

  apiGetUserIdUrl = 'api/loginclient/';
  apiGetRoleIdURL = 'api/loginclient/role/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  logInUser(pass: string): Observable<Login> {
    return this.http.get<Login>('https://localhost:5001/api/loginclient/' + pass);
  }
  logInUserEmail(email: string): Observable<Login> {
    return this.http.get<Login>('https://localhost:5001/api/loginclient/email/' + email);
  }
  // logInUser(user: Login): Observable<Login> {
  //   return this.http.post<Login>(this.server + this.apiLoginUrl, user, this.httpOptions);
  // }

  clientNamebyId(sessionId: number): Observable<Register> {
    // return this.http.get<Login>('https://localhost:5001/api/users?user=' + username);
    // return this.http.get<Login>(this.server + this.apiGetUserIdUrl + username);
    return this.http.get<Register>('https://localhost:5001/api/clients/' + sessionId);
  }

}