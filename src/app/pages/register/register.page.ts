import { Component, OnInit } from '@angular/core';
import { Router/*, ActivatedRoute*/ } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { Register } from '../Models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  Name: '';
  Email: '';
  Password: '';
  confirm_pass: '';

  disabledButton;

  constructor(
    private rs: RegisterService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  async tryRegister() {
    if (this.Name === '') {
      await this.presentToast('Your name is required');
    } else if (this.Email === '') {
      await this.presentToast('Email is required');
    } else if (this.Password === '') {
      await this.presentToast('Password is required');
    } else if (this.confirm_pass !== this.Password) {
      await this.presentToast('Password are not the same');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });
      loader.present();

      return new Promise(resolve => {
        const body: Register = {
          name: this.Name,
          email: this.Email,
          password: this.Password
        };

        this.rs.postClient(body).subscribe(data => {
          if (data != null) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Registro exitoso');
            this.router.navigate(['/login']);
          } else {
            //se esta saltando automaticamente
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Fallo algo');
            this.router.navigate(['/login']);
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Fallo en el registro');
        });
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

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

}
