import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTareas().subscribe({
      next: (tareas) => {
        console.log('Tareas recibidas:', tareas);
        if (Array.isArray(tareas)) {
          this.metaSemanal = tareas[0];
          this.metasDiarias = tareas.slice(1, 3);
        }
      },
      error: (err) => {
        console.error('Error cargando tareas:', err);
      }
    });
  }

  onTareaChecked(tarea: any, puntos: number, event: any) {
    if (event.detail.checked) {
      this.puntos += puntos;
    }
  }
}