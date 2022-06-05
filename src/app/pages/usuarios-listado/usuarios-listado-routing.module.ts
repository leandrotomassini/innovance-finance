import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosListadoPage } from './usuarios-listado.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosListadoPageRoutingModule {}
