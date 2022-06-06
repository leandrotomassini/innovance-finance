import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearUsuarioPageRoutingModule } from './crear-usuario-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearUsuarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class CrearUsuarioPageModule {}
