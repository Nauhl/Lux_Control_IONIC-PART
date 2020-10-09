import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';

import { FirebaseApp } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { LedService } from '../services/led.service';
import { ILed } from '../models/led';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  /*datastorage: any;
  name: string;

  users: any = [];
  limit: number = 13
  start: number = 0;*/

  arrayClients = [];
  clientName: string;

  constructor(
    private rs: RegisterService,
    private ls: LoginService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private ledS: LedService
  ) { }

  light: any;

  ngOnInit() {
    sessionStorage.getItem('sessionId');
    this.rs.getClients().subscribe(data => {
      this.arrayClients = data;
      console.log(this.arrayClients);
    });
    console.log(sessionStorage.getItem('sessionId'));
    this.getNameBySessionStorage();

    this.light = 'on';

  }

  putLedS(value: ILed) {
    this.ledS.putLedStatus(value);
  }

  turnOn() {
    const body: ILed = {
      LED_STATUS: 'ON'
    };
    this.putLedS(body);
    this.light = 'off';
    this.presentToastOn('Lámpara encendida');
  }
  turnOff() {
    const body: ILed = {
      LED_STATUS: 'OFF'
    };
    this.putLedS(body);
    this.light = 'on';
    this.presentToastOff('Lámpara apagada');
  }

  getNameBySessionStorage() {
    const sessionId = Number(sessionStorage.getItem('sessionId'));
    this.ls.clientNamebyId(sessionId).subscribe(data => {
      this.clientName = data.name;
    });
  }

  ionViewDidEnter() {
    /* this.storage.get('storage_xxx').then((res)=>{
       console.log(res);
       this.datastorage = res;
       this.name = this.datastorage.Name;
     });
     this.start = 0;
     this.users = [];
     this.loadUsers();*/
  }

  /*async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Please wait......',
    });
    loader.present();
    this.ionViewDidEnter();
    event.target.complete();
    loader.dismiss();
  }

  loadData(event:any){
    this.start += this.limit;
    setTimeout(() =>{
      this.loadUsers().then(()=>{
        event.target.complete();
      });
    }, 500);
  }

  async loadUsers() {

    return new Promise(resolve => {
        let body: Register = {
          /*aksi: 'load_users',
          start: this.start,
          limit: this.limit
        }
 
        this.rs.getClients(/*body, 'proses_api.php').subscribe((res:any)=>{
         for(let datas of res.result){
           this.users.push(datas);
         }
         resolve(true); 
        });
    });
  }

  async delData(a){
    return new Promise(resolve => {
      let body = {
        aksi: 'del_users',
        id: a
      }

      this.accPrvs.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          this.presentToast('Delete Successfuly');
          this.ionViewDidEnter();
        }else {
          this.presentToast('Delete error');
        }
      });
    });
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }*/

  async btnLogout() {
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Logout Successfuly',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  openCrud(a) {
    this.router.navigate(['/crud']);
  }

  async presentToastOn(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'middle',
      color: 'medium'
    });
    toast.present();
  }

  async presentToastOff(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'middle',
      color: 'dark'
    });
    toast.present();
  }

}
