import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { UsuariosListadoPageRoutingModule } from './usuarios-listado-routing.module';

import { UsuariosListadoPage } from './usuarios-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosListadoPageRoutingModule,
    PipesModule
  ],
  declarations: [UsuariosListadoPage]
})
export class UsuariosListadoPageModule {}
