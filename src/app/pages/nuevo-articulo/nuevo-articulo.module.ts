import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NuevoArticuloPageRoutingModule } from './nuevo-articulo-routing.module';
import { NuevoArticuloPage } from './nuevo-articulo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoArticuloPageRoutingModule
  ],
  declarations: [NuevoArticuloPage]
})
export class NuevoArticuloPageModule { }
