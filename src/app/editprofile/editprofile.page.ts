import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
  standalone: false,
})
export class EditprofilePage implements OnInit{
  nombre: string = '';
  email: string = '';
  password: string = '';
  nuevonombre: string ='';


  constructor(
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state ?? history.state;
 
    this.nombre = state?.nombreEnviado;
    this.email = state?.correoEnviado;
    this.password = state?.contraseñaEnviada;
   }

   ngOnInit() {
    this.nuevonombre = this.nombre;
  }

   async onAcept(){
    if(this.nombre != this.nuevonombre && this.nuevonombre != ''){

      this.nombre = this.nuevonombre

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
      if(this.nuevonombre == ''){
        this.presentAlert("No puede dejar el campo vacio")
      }else{
        this.presentAlert("El nombre de usuario ya esta en uso")
      }
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
