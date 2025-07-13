import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

// Mock de SQLiteObject
const sqliteObjectMock: any = {
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({
    rows: { length: 1, item: (i: number) => ({ id_usuario: 1, nombre: 'prueba', correo: 'prueba@gmail.com', password: 'prueba12345' }) }
  }))
};

// Mock de SQLite
const sqliteMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve(sqliteObjectMock))
};

// Mock de Platform
const platformMock = {
  ready: jasmine.createSpy('ready').and.returnValue(Promise.resolve())
};

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: SQLite, useValue: sqliteMock },
        { provide: Platform, useValue: platformMock }
      ]
    });

    service = TestBed.inject(DatabaseService);
    await service.crearBD(); // usa mocks ahora
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería insertar usuario de prueba', async () => {
    await service.creartablas();
    await service.buscarUsuarios();
    const usuarios = service.listaUsuarios.getValue();
    expect(usuarios.length).toBeGreaterThan(0);
    expect(usuarios[0].nombre).toBe('prueba');
  });
});
