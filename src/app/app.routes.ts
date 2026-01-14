import { Routes } from '@angular/router';
import { ListComponent } from './ganado/list/list';
import { FormComponent } from './ganado/form/form';
export const appRoutes: Routes = [
  { path: '', redirectTo: 'ganado/list', pathMatch: 'full' }, // redirige la raíz
  { path: 'ganado/list', component: ListComponent },          // standalone
  { path: 'ganado/form', component: FormComponent },          // standalone
  { path: '**', redirectTo: 'ganado/list' }                   // fallback
];
