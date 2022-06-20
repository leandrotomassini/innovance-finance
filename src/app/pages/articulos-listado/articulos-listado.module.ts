import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosListadoPageRoutingModule } from './articulos-listado-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { ArticulosListadoPage } from './articulos-listado.page';
import { NuevoArticuloPage } from '../nuevo-articulo/nuevo-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosListadoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ArticulosListadoPage, NuevoArticuloPage]
})
export class ArticulosListadoPageModule {}
