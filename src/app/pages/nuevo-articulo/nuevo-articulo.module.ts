import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditorModule } from '@tinymce/tinymce-angular';

import { NuevoArticuloPageRoutingModule } from './nuevo-articulo-routing.module';
import { NuevoArticuloPage } from './nuevo-articulo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoArticuloPageRoutingModule,
    ComponentsModule,
    EditorModule,
    ReactiveFormsModule
  ],
  declarations: [NuevoArticuloPage]
})
export class NuevoArticuloPageModule { }
