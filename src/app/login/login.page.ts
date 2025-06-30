import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private databaseService: DatabaseService
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.presentAlert('Debes completar ambos campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: 'custom-spinner',
      backdropDismiss: false,
      message: 'Verificando credenciales...'
    });

    await loading.present();

    const loginExitoso = await this.databaseService.loginUsuario(this.email, this.password);

    await loading.dismiss();

    if (loginExitoso) {
      const usuario = this.databaseService.getUsuarioActual();
      console.log('Usuario autenticado: ' + JSON.stringify(usuario));;
      alert('Bienvenido');

      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.router.navigate(['/tabs/tab1']);
    } else {
      this.presentAlert('Correo o contraseña incorrectos.');
    }
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}