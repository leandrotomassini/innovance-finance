import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { UsuariosPage } from '../usuarios/usuarios.page';
import { ArticulosPage } from '../articulos/articulos.page';
import { CursosPage } from '../cursos/cursos.page';
import { AplicacionesPage } from '../aplicaciones/aplicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosPageModule)
      },
      {
        path: 'articulos',
        loadChildren: () => import('../articulos/articulos.module').then(m => m.ArticulosPageModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('../cursos/cursos.module').then(m => m.CursosPageModule)
      },
      {
        path: 'aplicaciones',
        loadChildren: () => import('../aplicaciones/aplicaciones.module').then(m => m.AplicacionesPageModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
