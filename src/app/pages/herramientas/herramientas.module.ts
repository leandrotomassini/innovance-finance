import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerramientasPageRoutingModule } from './herramientas-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { HerramientasPage } from './herramientas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerramientasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HerramientasPage]
})
export class HerramientasPageModule {}
