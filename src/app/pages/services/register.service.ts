import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../Models/register';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  server = 'https://localhost:5001/';
  apiClientUrl = 'api/clients/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }


  getClients() {
    return this.http.get<any>(this.server + this.apiClientUrl);
  }

  getClientbyId(id: number): Observable<Register> {
    return this.http.get<Register>(this.server + this.apiClientUrl + id);
  }

  postClient(user: Register): Observable<Register> {
    return this.http.post<Register>('https://localhost:5001/api/clients', user, this.httpOptions);
  }

  putClient(id: number, user: Register): Observable<Register> {
    return this.http.put<Register>(this.server + this.apiClientUrl + id, user, this.httpOptions);
    // return this.http.put<User>('https://localhost:5001/api/users/putusername', user, this.httpOptions);
  }

  deleteClient(id: number): Observable<Register> {
    return this.http.delete<Register>(this.server + this.apiClientUrl + id);
  }

}