import { Component, OnInit } from '@angular/core';
import { Router/*, ActivatedRoute*/ } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';
import { Register } from '../Models/register';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.page.html',
  styleUrls: ['./info-account.page.scss'],
})
export class InfoAccountPage implements OnInit {

  Name: string;
  Email: string;
  Password: string;

  disabledButton;

  constructor(
    private rs: RegisterService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    sessionStorage.getItem('sessionId');
    this.getClientData();
  }

  getClientData() {
    let sessionId = Number(sessionStorage.getItem('sessionId'));
    this.rs.getClientbyId(sessionId).subscribe(data => {
      this.Name = data.name;
      this.Email = data.email;
      this.Password = data.password;
    });
  }

  async updateAccount() {
    if (this.Name === '') {
      await this.presentToast('Your name is required');
    } else if (this.Email === '') {
      await this.presentToast('Email is required');
    } else if (this.Password === '') {
      await this.presentToast('Password is required');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });
      loader.present();

      return new Promise(resolve => {
        const sessionId = Number(sessionStorage.getItem('sessionId'));

        const body: Register = {
          id: sessionId,
          name: this.Name,
          email: this.Email,
          password: this.Password
        };

        this.rs.putClient(sessionId, body).subscribe(data => {
          if (data != null) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Fallo algo');
            this.router.navigate(['/home']);
          } else {
            //se esta saltando automaticamente
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Actualización de datos exitosa');
            this.router.navigate(['/home']).then(() => { window.location.reload(); });
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Fallo en la actualización');
        });
      });
    }
  }

  async deleteAccount() {
    const sessionId = Number(sessionStorage.getItem('sessionId'));
    if (sessionId < 0) {
      console.log('SessionId no existe');
    } else {
      this.disabledButton = true;
      // const loader = await this.loadingCtrl.create({
      //   message: 'Please wait......',
      // });
      // loader.present();

      return new Promise(resolve => {

        this.presentAlertForDelete('¿Seguro de eliminar tu cuenta?');

        // this.rs.deleteClient(sessionId).subscribe(data => {
        //   if (data != null) {
        //     loader.dismiss();
        //     this.disabledButton = false;
        //     this.presentToast('Fallo algo');
        //     this.router.navigate(['/home']);
        //   } else {
        //     //se esta saltando automaticamente
        //     loader.dismiss();
        //     this.disabledButton = false;
        //     this.presentToast('Actualización de datos exitosa');
        //     this.router.navigate(['/home']).then(() => { window.location.reload(); });
        //   }
        // }, (err) => {
        //   loader.dismiss();
        //   this.disabledButton = false;
        //   this.presentAlertForDelete('Fallo en la eliminación');
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
            this.updateAccount();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertForDelete(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            const sessionId = Number(sessionStorage.getItem('sessionId'));
            this.rs.deleteClient(sessionId).subscribe(data => {
              if (data != null) {
                this.disabledButton = false;
                this.presentToast('Fallo algo');
                this.router.navigate(['/home']);
              } else {
                this.disabledButton = false;
                this.router.navigate(['/intro']);
                this.presentToast('Actualización de datos exitosa');
                console.log('sessionId eliminado forever: ', sessionId);
              }
            }, (err) => {
              this.disabledButton = false;
              this.presentAlertForDelete('Fallo en la eliminación');
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
