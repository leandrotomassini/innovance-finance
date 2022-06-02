import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { EstudiarPageRoutingModule } from './estudiar-routing.module';


import { EstudiarPage } from './estudiar.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstudiarPage]
})
export class EstudiarPageModule {}
