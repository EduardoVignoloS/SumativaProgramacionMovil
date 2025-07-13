import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service'; // Asegúrate de que este path esté correcto

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit {
  metaSemanal: any;
  metasDiarias: any[] = [];
  puntos: number = 0;

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    this.dbService.dbstate().subscribe(async ready => {
      if (ready) {
        const metas = await this.dbService.obtenerMetasAleatorias(4);
        this.metaSemanal = metas[0];
        this.metasDiarias = metas.slice(1);
      }
    });
  }

  onTareaChecked(tarea: any, puntos: number, event: any) {
    if (event.detail.checked) {
      this.puntos += puntos;
    }
  }
}