import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../pipes/pipes.module';

import { ChatComponent } from './chat/chat.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';



@NgModule({
  declarations: [
    ChatComponent,
    UsuariosComponent,
    UsuarioFormularioComponent
  ],
  exports: [
    ChatComponent,
    UsuariosComponent,
    UsuarioFormularioComponent
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
