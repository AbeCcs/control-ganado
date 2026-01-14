import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanadoRoutingModule } from './ganado-routing-module';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form';
import { ListComponent } from './list/list';


@NgModule({
  declarations: [],
  imports: [
   CommonModule,     // <- Necesario para pipes como date
    FormsModule,      // <- Necesario para [(ngModel)]
    GanadoRoutingModule,  
    ListComponent,   // <- Se importa en lugar de declararse
    FormComponent    // <- Se importa en lugar de declararse
  ]
})
export class GanadoModule { }
