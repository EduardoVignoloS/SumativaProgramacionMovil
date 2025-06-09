import { Component} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  nombre: string = 'prueba';
  email: string = '';
  password: string = '';
  emailvalido: string = 'prueba@gmail.com';
  passwordvalida: string = 'prueba12345';

  constructor(
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async onLogin(){
    if(this.email == this.emailvalido && this.password == this.passwordvalida){
      const loading = await this.loadingCtrl.create({
        spinner:'crescent',
        cssClass: 'custom-spinner',
        backdropDismiss: false,
      });

      await loading.present();

      let navigationExtras: NavigationExtras ={
        state : {
          nombreEnviado: this.nombre,
          correoEnviado: this.email,
          contraseñaEnviada: this.password
        }
      }

      setTimeout(async()=> {
       await loading.dismiss();
        this.router.navigate(['/tabs/tab1'], navigationExtras);
      }, 2_000)


    }
    else{

      this.presentAlert("Usuario y/o Contraseña incorrectos")

    }
  }
  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: msj,
      buttons: ['ACEPTAR'],
    })
    await alert.present();
  }
}

