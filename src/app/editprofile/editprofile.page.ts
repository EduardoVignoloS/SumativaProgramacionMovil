import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
  standalone: false,
})
export class EditprofilePage {
  nombre: string = '';
  imagen: string = '';

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private dbService: DatabaseService
  ) {}

  ionViewWillEnter() {
    const usuario = JSON.parse(localStorage.getItem('tokenUsuario') || '{}');
    this.nombre = usuario?.nombre || '';
    this.imagen = usuario?.foto || '';
  }

  async cambiarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });

      this.imagen = `data:image/jpeg;base64,${image.base64String}`;
    } catch (error) {
      console.log('No se seleccionó imagen');
    }
  }

  async guardarCambios() {
    const usuario = JSON.parse(localStorage.getItem('tokenUsuario') || '{}');
    if (!usuario?.id) return;

    usuario.nombre = this.nombre;
    usuario.foto = this.imagen;

    // Guarda en SQLite
    await this.dbService.actualizarUsuario(usuario.id, this.nombre, this.imagen);

    // Guarda en localStorage
    localStorage.setItem('tokenUsuario', JSON.stringify(usuario));

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Perfil actualizado',
      buttons: ['OK']
    });
    await alert.present();

    this.navCtrl.navigateBack('/tabs/tab1');
  }
}