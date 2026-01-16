import { Component } from '@angular/core';
import { supabase } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrls: ['./form.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FormComponent {
  numero!: number;
  fecha_compra!: string;
  peso!: number;
  clasificacion!: string;

  async agregarGanado() {
    const { data, error } = await supabase.from('ganado').insert({
      numero: this.numero,
      fecha_compra: this.fecha_compra,
      peso: this.peso,
      clasificacion: this.clasificacion,
    });

    if (error) console.error(error);
    else alert('Ganado agregado!');
  }
}
