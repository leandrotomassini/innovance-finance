import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { UsuariosPanelComponent } from './usuarios/usuarios-panel/usuarios-panel.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';



@NgModule({
  declarations: [
    HeaderComponent,
    UsuariosPanelComponent,
    EditarUsuarioComponent
  ],
  exports: [
    HeaderComponent,
    UsuariosPanelComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
