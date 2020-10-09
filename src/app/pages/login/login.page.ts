import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Login } from '../Models/login';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Email: '';
  Password: '';

  disabledButton;

  constructor(
    private lgservice: LoginService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryLogin() {
    console.log('Btn login pressed');
    if (this.Email === '') {
      this.presentToast('Email is required');
    } else if (this.Password === '') {
      this.presentToast('Password is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });
      loader.present();

      return new Promise(resolve => {
        // const body: Login = {
        //   email: this.Email,
        //   password: this.Password
        // };

        // email: this.Email;
        // password: this.Password;

        this.lgservice.logInUserEmail(this.Email).subscribe(dataEmail => {
          this.lgservice.logInUser(this.Password).subscribe(dataPass => {
            if (dataPass != null && dataEmail != null) {
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Login Successfuly');
              sessionStorage.setItem('sessionId', '' + dataPass);
              // this.storage.set('storage_xxx', data.id);
              this.storage.set('storage_xxx', dataPass);
              this.navCtrl.navigateRoot(['/home']);
            } else {
              this.router.navigate(['/home']);
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Email or password is wrong');
            }
            console.log(dataPass);
          }, (err) => {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Email or password is wrong');
          });
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentToast('Email or password is wrong');
        });




        // this.lgservice.logInUser(body).subscribe((res: any) => {
        //   if (res.success === true) {
        //     loader.dismiss();
        //     this.disabledButton = false;
        //     this.presentToast('Email or password is wrong');
        //   } else {
        //     loader.dismiss();
        //     this.disabledButton = false;
        //     this.presentToast('Login Successfuly');
        //     // this.storage.set('storage_xxx', res.result);
        //     this.navCtrl.navigateRoot(['/home']);
        //     // this.router.navigate(['/home']);
        //   }
        // }, (err) => {
        //   loader.dismiss();
        //   this.disabledButton = false;
        //   this.presentToast('Timeout');
        // });

      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  openRegister() {
    this.router.navigate(['/register']);
  }
}
