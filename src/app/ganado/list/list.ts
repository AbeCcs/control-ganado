import { Component, OnInit } from '@angular/core';
import { supabase } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  standalone: true,
  imports: [CommonModule]   // <- Esto permite usar *ngFor, *ngIf y pipes
})
export class ListComponent implements OnInit {
  ganados: any[] = [];

  async ngOnInit() {
    const { data, error } = await supabase.from('ganado').select('*');
    if (error) console.error(error);
    else this.ganados = data || [];
  }
}
