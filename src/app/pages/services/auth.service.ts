import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { HttpClient } from '@angular/common/http';

/*import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
import { AngularFirestore } from "@angular/fire/firestore";*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(/*private AFauth : AngularFireAuth,*/ private router : Router, private googleplus: GooglePlus/*,
    private db : AngularFirestore*/ , private http: HttpClient) { }

  /*loginGoogle() {
      return this.googleplus.login({}).then((result) =>{
          const data_user = result;
          return this.AFauth.signInWithCredential(auth.GoogleAuthProvider.credential(null, data_user.accessToken));
      })
  }

  logout(){
    this.googleplus.disconnect();
  }*/

  //URL = 'http://localhost/Lux-control/src/backend/LuxControl.WebAPI';
  
}