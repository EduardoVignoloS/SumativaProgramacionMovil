import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  nombre: string = '';
  correo: string = '';
  puntos: number = 0;
  foto: string = '../assets/profilephotodefault.png';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const tokenStr = localStorage.getItem('tokenUsuario');
    console.log('Token leído desde localStorage:', tokenStr);

    if (tokenStr) {
      try {
        const token = JSON.parse(tokenStr);
        console.log('Token parseado:', token);

        this.nombre = token.nombre;
        this.correo = token.correo;
        this.puntos = token.puntos;
        this.foto = token.foto || '../assets/profilephotodefault.png';
      } catch (error) {
        console.error('Error parseando tokenUsuario', error);
      }
    } else {
      console.warn('No existe tokenUsuario en localStorage');
    }
  }

  async onExit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      backdropDismiss: false,
      message: 'Cerrando sesión...'
    });

    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      localStorage.removeItem('tokenUsuario'); // ← esto era importante
      this.navCtrl.navigateRoot('/login');
    }, 1500);
  }

  onEdit() {
    this.router.navigate(['/editprofile']);
  }
}