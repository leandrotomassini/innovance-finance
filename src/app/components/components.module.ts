import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../pipes/pipes.module';

import { ChatComponent } from './chat/chat.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [
    ChatComponent,
    UsuariosComponent
  ],
  exports: [
    ChatComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
