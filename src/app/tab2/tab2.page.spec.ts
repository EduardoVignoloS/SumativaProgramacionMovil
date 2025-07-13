import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab2Page } from './tab2.page';
import { IonicModule, Platform } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve({ rows: { length: 0, item: (i: number) => null } })
    });
  }
}

class DatabaseServiceMock {
  dbstate() {
    return { subscribe: (fn: (ready: boolean) => void) => fn(true) };
  }

  async obtenerMetasAleatorias(n: number) {
    return [
      { id_meta: 1, descripcion: 'Meta semanal' },
      { id_meta: 2, descripcion: 'Meta diaria 1' },
      { id_meta: 3, descripcion: 'Meta diaria 2' },
      { id_meta: 4, descripcion: 'Meta diaria 3' },
    ];
  }
}

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot()],
      providers: [
        Platform,
        { provide: SQLite, useClass: SQLiteMock },
        { provide: DatabaseService, useClass: DatabaseServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load metas on init', async () => {
    await component.ngOnInit();
    expect(component.metaSemanal).toBeTruthy();
    expect(component.metasDiarias.length).toBe(3);
  });
});
