import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { UsuariosListadoPageRoutingModule } from './usuarios-listado-routing.module';

import { UsuariosListadoPage } from './usuarios-listado.page';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';
import { CrearUsuarioPage } from '../crear-usuario/crear-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosListadoPageRoutingModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsuariosListadoPage,
    EditarUsuarioPage,
    CrearUsuarioPage
  ]
})
export class UsuariosListadoPageModule {}
