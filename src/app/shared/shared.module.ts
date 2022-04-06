import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CabeceraComponent } from './cabecera/cabecera.component';



@NgModule({
  declarations: [
    MenuPrincipalComponent,
    CabeceraComponent
  ],
  exports: [
    MenuPrincipalComponent,
    CabeceraComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
