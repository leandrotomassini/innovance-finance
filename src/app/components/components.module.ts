import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '../pipes/pipes.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolFormularioComponent } from './rol-formulario/rol-formulario.component';
import { RolesComponent } from './roles/roles.component';
import { SubscripcionFormularioComponent } from './subscripcion-formulario/subscripcion-formulario.component';
import { SubscripcionesComponent } from './subscripciones/subscripciones.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { SubscriptoresComponent } from './subscriptores/subscriptores.component';
import { SubscriptorFormularioComponent } from './subscriptor-formulario/subscriptor-formulario.component';


@NgModule({
  declarations: [
    RolFormularioComponent,
    RolesComponent,
    SubscripcionFormularioComponent,
    SubscriptorFormularioComponent,
    SubscripcionesComponent,
    SubscriptoresComponent,
    UsuarioFormularioComponent,
    UsuariosComponent
  ],
  exports: [
    RolFormularioComponent,
    RolesComponent,
    SubscripcionFormularioComponent,
    SubscripcionesComponent,
    SubscriptoresComponent,
    UsuarioFormularioComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
