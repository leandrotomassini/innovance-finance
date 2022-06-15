import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosListadoPageRoutingModule } from './articulos-listado-routing.module';

import { ArticulosListadoPage } from './articulos-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosListadoPageRoutingModule
  ],
  declarations: [ArticulosListadoPage]
})
export class ArticulosListadoPageModule {}
