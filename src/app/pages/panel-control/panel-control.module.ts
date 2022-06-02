import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanelControlPageRoutingModule } from './panel-control-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { PanelControlPage } from './panel-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelControlPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PanelControlPage]
})
export class PanelControlPageModule {}
