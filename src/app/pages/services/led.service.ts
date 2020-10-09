import { ILed } from '../models/led';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class LedService {

    firebaseDatabase = 'https://luxcontrol-68d8f.firebaseio.com/';

    constructor(private http: HttpClient, private fbDBB: AngularFireDatabase) {
    }

    putLedStatus(valueStat: ILed) {
        return this.fbDBB.database.refFromURL('https://luxcontrol-68d8f.firebaseio.com/').update(valueStat);
    }

}

