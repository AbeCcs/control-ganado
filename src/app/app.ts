import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',   // verifica que este archivo exista
  styleUrls: ['./app.scss'],    // plural y arreglo
  standalone: true,
  imports: [RouterOutlet,RouterLink]                // necesario para <router-outlet>
})
export class App {
  protected readonly title = signal('control-ganado');
}
