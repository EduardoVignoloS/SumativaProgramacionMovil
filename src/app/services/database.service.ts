import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public database!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  // SQL: creación tabla y usuario de prueba
  tablaUsuarios: string = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(40) NOT NULL,
      correo VARCHAR(40) NOT NULL,
      password VARCHAR(40) NOT NULL,
      puntos NUMBER DEFAULT 0,
      foto TEXT
    );
  `;

  registrarUsuarios: string = `
    INSERT OR IGNORE INTO usuarios(id_usuario, nombre, correo, password) VALUES
      (1, 'prueba', 'prueba@gmail.com', 'prueba12345'),
      (2, 'usuario1', 'usuario1@gmail.com', 'usuario12345'),
      (3, 'usuario2', 'usuario2@gmail.com', 'usuario22345'),
      (4, 'usuario3', 'usuario3@gmail.com', 'usuario32345');
  `;

  // creacion tabla tareas

  tablaMetas: string = `
    CREATE TABLE IF NOT EXISTS metas (
      id_meta INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL
    );
  `;

  registrarMetas: string[] = [
    `INSERT INTO metas (descripcion) VALUES ('Leer 10 páginas de un libro');`,
    `INSERT INTO metas (descripcion) VALUES ('Hacer 30 minutos de ejercicio');`,
    `INSERT INTO metas (descripcion) VALUES ('Organizar tu escritorio');`,
    `INSERT INTO metas (descripcion) VALUES ('Aprender una nueva palabra');`,
    `INSERT INTO metas (descripcion) VALUES ('Limpiar tu correo electrónico');`,
    `INSERT INTO metas (descripcion) VALUES ('Aprender una nueva habilidad');`,
    `INSERT INTO metas (descripcion) VALUES ('Tomar 3 litros de agua');`,
    `INSERT INTO metas (descripcion) VALUES ('Dormir 8 horas');`,
    `INSERT INTO metas (descripcion) VALUES ('Escribir en tu diario personal');`,
    `INSERT INTO metas (descripcion) VALUES ('Llamar a un familiar');`
  ];

  listaUsuarios = new BehaviorSubject<Usuarios[]>([]);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.crearBD(); 
  }

  dbstate(): Observable<boolean> {
    return this.isDBReady.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdusuariosweekly.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.creartablas();
      });
    }).catch(e => {
      this.presentAlert("Error en la plataforma: " + e)
    });
  }

  async creartablas() {
    try {
      await this.database.executeSql(this.tablaUsuarios, []);
      await this.database.executeSql(this.tablaMetas, []);
      try {
        await this.database.executeSql(`ALTER TABLE usuarios ADD COLUMN foto TEXT;`, []);
      } catch (e) {
        console.log('La columna "foto" ya existe o no fue necesaria:' + e);
      }
      await this.database.executeSql(this.registrarUsuarios, []);
      for (const sql of this.registrarMetas) {
        await this.database.executeSql(sql, []);
      }
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert("Error creando tablas: " + e);
    }
  }

  async buscarUsuarios() {
    try {
      const res = await this.database.executeSql('SELECT * FROM usuarios', []);
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push(res.rows.item(i));
        }
      }
      this.listaUsuarios.next(items);
    } catch (e) {
      this.presentAlert("Error al buscar usuarios: " + e);
    }
  }

  async loginUsuario(correo: string, password: string): Promise<boolean> {
    try {
      const res = await this.database.executeSql(
        "SELECT * FROM usuarios WHERE correo = ? AND password = ?",
        [correo, password]
      );

      if (res.rows.length > 0) {
        const user = res.rows.item(0);
        const token = {
          id: user.id_usuario,
          nombre: user.nombre,
          correo: user.correo,
          puntos: user.puntos,
          foto: user.foto,
        };

        localStorage.setItem('tokenUsuario', JSON.stringify(token));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      this.presentAlert("Error al iniciar sesión: " + e);
      return false;
    }
  }

  async actualizarUsuario(id: number, nombre: string, foto: string) {
    try {
      return await this.database.executeSql(
        'UPDATE usuarios SET nombre = ?, foto = ? WHERE id_usuario = ?',
        [nombre, foto, id]
      );
    } catch (e) {
      this.presentAlert("Error actualizando usuario: " + e);
    }
  }

  getUsuarioActual(): Usuarios | null {
    const user = localStorage.getItem('tokenUsuario');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  logout() {
    localStorage.removeItem('tokenUsuario');
  }

  async obtenerMetasAleatorias(n: number): Promise<any[]> {
    const res = await this.database.executeSql(`SELECT * FROM metas ORDER BY RANDOM() LIMIT ?`, [n]);
    let metas: any[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      metas.push(res.rows.item(i));
    }
    return metas;
  }
}

