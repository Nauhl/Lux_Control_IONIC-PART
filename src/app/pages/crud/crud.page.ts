import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  Id: number;
  Name: string = "";
  Email: string = "";
  Password: string = "";
  confirm_pass: string = "";
 
  disabledButton;
 
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accPrvs: AccessProviders,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      console.log(data);
      this.Id = data.id; 
      if(this.Id!=0){
        this.loadUser(); 
      }
    });
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  loadUser() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        Id: this.Id
      }

      this.accPrvs.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.Name = res.result.Name;
        this.Email = res.result.Email;
      });
    });
  }

  async crudAction(a) {
    if(this.Name==""){
      this.presentToast('Your name is required');
    }else if(this.Email==""){
      this.presentToast('Email is required');
    }else if(this.Password=="" && this.Id==0){
      this.presentToast('Password is required');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please wait......',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_crud',
          Id: this.Id,
          Name: this.Name,
          Email: this.Email,
          Password: this.Password,
          action: a
        }

        this.accPrvs.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(a+res.msg);
            this.router.navigate(['/home']);
          }else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert(res.msg,a);
          } 
        },(err)=>{
          loader.dismiss();
            this.disabledButton = false;
            this.presentAlert('Timeout',a);
        });
      });
    }
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
 
  async presentAlert(a,b) {
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
            this.crudAction(b);
          }
        }
      ]
    });

    await alert.present();
  }

}
