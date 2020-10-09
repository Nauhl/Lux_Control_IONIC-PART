import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/*import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';*/

import { map } from 'rxjs/operators';
import { timeout } from 'rxjs/operators'; 

@Injectable()
export class AccessProviders {
    //url backend api 'Documents/5toTETRA/Profe Liz\L-ctrl-Project'
    server: string = 'http://localhost/tutorial/api/';

    constructor(
        public http: HttpClient
      ) { }

    postData(body, file){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        let options = {
            headers: headers
        }

        /*return this.http.post(this.server + file, JSON.stringify(body), options)
        .timeout(59000) //59 sec timeout
        .map(res => res);*/

       return this.http.post(this.server + file, JSON.stringify(body), options)
           .pipe(timeout(59000)) // 59 sec timeout
           .pipe(map(res => res));
    }  
}