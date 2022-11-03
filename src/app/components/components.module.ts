import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../pipes/pipes.module';

import { ChatComponent } from './chat/chat.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { RolesComponent } from './roles/roles.component';
import { RolFormularioComponent } from './rol-formulario/rol-formulario.component';
import { SubscripcionesComponent } from './subscripciones/subscripciones.component';
import { SubscripcionFormularioComponent } from './subscripcion-formulario/subscripcion-formulario.component';



@NgModule({
  declarations: [
    ChatComponent,
    UsuariosComponent,
    UsuarioFormularioComponent,
    RolesComponent,
    RolFormularioComponent,
    SubscripcionesComponent,
    SubscripcionFormularioComponent
  ],
  exports: [
    ChatComponent,
    UsuariosComponent,
    UsuarioFormularioComponent,
    RolesComponent,
    SubscripcionesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
