import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HerramientasPageRoutingModule } from './herramientas-routing.module';

import { HerramientasPage } from './herramientas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerramientasPageRoutingModule
  ],
  declarations: [HerramientasPage]
})
export class HerramientasPageModule {}
