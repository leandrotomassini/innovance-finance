import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { EditortextoComponent } from './editortexto/editortexto.component';


@NgModule({
  declarations: [
    HeaderComponent,
    EditortextoComponent
  ],
  exports: [
    HeaderComponent,
    EditortextoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
