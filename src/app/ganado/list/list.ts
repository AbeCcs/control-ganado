import { Component, OnInit } from '@angular/core';
import { supabase } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <- IMPORTANTE


@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'], // <- tu SCSS moderno
  standalone: true,
  imports: [CommonModule, FormsModule]   // <- Esto permite usar *ngFor, *ngIf y pipes
})
export class ListComponent implements OnInit {
  ganados: any[] = [];

  async ngOnInit() {
  const { data, error } = await supabase
    .from('ganado')
    .select(`
      *,
      revisiones(*)
    `);

  if (error) {
    console.error(error);
  } else {
    this.ganados = data || [];

    // Inicializar variables para cada ganado
    this.ganados.forEach(g => {
      g.showHistorial = false;
      g.showForm = false;
    });
  }
    console.log(this.ganados);
  }

  toggleHistorial(index: number) {
  this.ganados[index].showHistorial = !this.ganados[index].showHistorial;
}

agregarRevision(index: number, nuevoPeso: number, tipo: string,nombre_trabajador: string, observaciones: string) {
  if (!nuevoPeso) return alert('Debe ingresar un peso válido');

  const nuevaRevision = {
    fecha_revision: new Date(),
    tipo_revision: tipo || 'general',
    observaciones: observaciones || 'Sin observaciones',
    peso: nuevoPeso,
    nombre_trabajador: nombre_trabajador
  };

  if (!this.ganados[index].historial) {
    this.ganados[index].historial = [];
  }

  this.ganados[index].historial.push(nuevaRevision);

  // Actualizar el peso del ganado original
  this.ganados[index].peso = nuevoPeso;

  // Mostrar historial y ocultar formulario
  this.ganados[index].showHistorial = true;
  this.ganados[index].showForm = false;

  // Limpiar inputs
  this.ganados[index].nuevoPeso = null;
  this.ganados[index].nuevoTipo = '';
  this.ganados[index].nuevaObs = '';
}

async agregarRevisionBackend(index: number) {
  const g = this.ganados[index];

  if (!g.nuevoPeso) return alert('Debe ingresar un peso válido');
  if (!g.nuevoTrabajador) return alert('Debe ingresar el nombre del trabajador');

  const nuevaRevision = {
    ganado_id: g.id,
    fecha_revision: new Date().toISOString().split('T')[0], // formato YYYY-MM-DD
    tipo_revision: g.nuevoTipo || 'general',
    observaciones: g.nuevaObs || 'Sin observaciones',
    "Nombre Trabajador": g.nuevoTrabajador,
    Peso: g.nuevoPeso
  };

  try {
    // Insertar revisión
    const { data: revData, error: revError } = await supabase
      .from('revisiones')
      .insert(nuevaRevision)
      .select();

    if (revError) throw revError;

    // Actualizar peso en ganado
    const { data: ganadoData, error: ganadoError } = await supabase
      .from('ganado')
      .update({ peso: g.nuevoPeso })
      .eq('id', g.id)
      .select();

    if (ganadoError) throw ganadoError;

    // Limpiar inputs
    g.nuevoPeso = null;
    g.nuevoTipo = '';
    g.nuevaObs = '';
    g.nuevoTrabajador = '';

    this.ngOnInit(); // Refrescar la lista de ganados y sus revisiones
  } catch (error) {
    console.error(error);
    alert('Error al guardar la revisión. Revisa la consola.');
  }
};

async venderGanado(ganadoId: string) {
  if (!confirm('¿Seguro que deseas vender este ganado? Esta acción no se puede deshacer.')) {
    return;
  }

  try {
    // 1. Eliminar revisiones asociadas
    const { error: revError } = await supabase
      .from('revisiones')
      .delete()
      .eq('ganado_id', ganadoId);

    if (revError) throw revError;

    // 2. Eliminar el ganado
    const { error: ganadoError } = await supabase
      .from('ganado')
      .delete()
      .eq('id', ganadoId);

    if (ganadoError) throw ganadoError;

    // 3. Actualizar tabla local
    this.ganados = this.ganados.filter(g => g.id !== ganadoId);

    alert('Ganado vendido correctamente.');

  } catch (err) {
    console.error(err);
    alert('Error al vender el ganado. Revisa la consola.');
  }
}


}
