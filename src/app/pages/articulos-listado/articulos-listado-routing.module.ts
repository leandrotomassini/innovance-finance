import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticulosListadoPage } from './articulos-listado.page';

const routes: Routes = [
  {
    path: '',
    component: ArticulosListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticulosListadoPageRoutingModule {}
