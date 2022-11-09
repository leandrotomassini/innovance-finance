import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuLateralComponent,
    BannerComponent
  ],
  exports: [
    HeaderComponent,
    MenuLateralComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class SharedModule { }
