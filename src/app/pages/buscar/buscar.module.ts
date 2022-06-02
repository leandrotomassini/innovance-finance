import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarPageRoutingModule } from './buscar-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { BuscarPage } from './buscar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BuscarPage]
})
export class BuscarPageModule {}
