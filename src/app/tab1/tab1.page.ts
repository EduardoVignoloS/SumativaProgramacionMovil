import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state ?? history.state;

    this.nombre = state?.nombreEnviado;
    this.email = state?.correoEnviado;
    this.password = state?.contraseñaEnviada;

  }

  async onExit(){
    const loading = await this.loadingCtrl.create({
      spinner:'crescent',
      cssClass: 'custom-spinner',
      backdropDismiss: false,
      
    });

    await loading.present();

    setTimeout(async()=> {
      await loading.dismiss();
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.navCtrl.navigateRoot('/login');

    }, 2_000)

  }
  async onEdit(){

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
      this.router.navigate(['/editprofile'], navigationExtras);
    }, 2_000)

  } 

}

  