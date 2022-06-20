import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosListadoPageRoutingModule } from './articulos-listado-routing.module';

import { ArticulosListadoPage } from './articulos-listado.page';
import { NuevoArticuloPage } from '../nuevo-articulo/nuevo-articulo.page';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosListadoPageRoutingModule,
    EditorModule,
    ReactiveFormsModule
  ],
  declarations: [ArticulosListadoPage, NuevoArticuloPage]
})
export class ArticulosListadoPageModule {}
