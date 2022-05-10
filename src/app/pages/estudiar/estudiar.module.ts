import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiarPageRoutingModule } from './estudiar-routing.module';

import { EstudiarPage } from './estudiar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiarPageRoutingModule
  ],
  declarations: [EstudiarPage]
})
export class EstudiarPageModule {}
