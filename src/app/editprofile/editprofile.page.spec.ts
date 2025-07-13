import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditprofilePage } from './editprofile.page';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { FormsModule } from '@angular/forms';

// Mock SQLite
class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve({ rows: { length: 0, item: (i: number) => null } })
    });
  }
}

// Mock DatabaseService
class DatabaseServiceMock {
  getUsuarioActual() {
    return {
      id: 1,
      nombre: 'Usuario Test',
      correo: 'test@correo.com',
      puntos: 10,
      foto: ''
    };
  }

  async actualizarUsuario(id: number, nombre: string, foto: string) {
    return true;
  }
}

describe('EditprofilePage', () => {
  let component: EditprofilePage;
  let fixture: ComponentFixture<EditprofilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprofilePage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: DatabaseService, useClass: DatabaseServiceMock },
        { provide: SQLite, useClass: SQLiteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los datos del usuario', async () => {
    localStorage.setItem('tokenUsuario', JSON.stringify({
      id: 1,
      nombre: 'Usuario Test',
      correo: 'test@correo.com',
      foto: ''
    }));
    await component.ionViewWillEnter();
    expect(component.nombre).toBe('Usuario Test');
});
});