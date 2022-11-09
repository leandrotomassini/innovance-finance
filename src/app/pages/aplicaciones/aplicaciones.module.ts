import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicacionesPageRoutingModule } from './aplicaciones-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AplicacionesPage } from './aplicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AplicacionesPageRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  declarations: [AplicacionesPage]
})
export class AplicacionesPageModule {}
