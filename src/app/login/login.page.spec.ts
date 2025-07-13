import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DatabaseService } from '../services/database.service';

class SQLiteMock {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve({ rows: { length: 0, item: () => null } })
    });
  }
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        Platform,
        DatabaseService,
        { provide: SQLite, useClass: SQLiteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});