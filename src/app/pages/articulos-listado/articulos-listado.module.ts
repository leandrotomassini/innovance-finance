import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticulosListadoPageRoutingModule } from './articulos-listado-routing.module';

import { ArticulosListadoPage } from './articulos-listado.page';
import { NuevoArticuloPage } from '../nuevo-articulo/nuevo-articulo.page';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticulosListadoPageRoutingModule,
    EditorModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [ArticulosListadoPage, NuevoArticuloPage]
})
export class ArticulosListadoPageModule {}
