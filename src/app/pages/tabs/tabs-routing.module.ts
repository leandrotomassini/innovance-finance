import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioGuard } from 'src/app/guards/usuario.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'aprender',
        loadChildren: () => import('../../pages/estudiar/estudiar.module').then(m => m.EstudiarPageModule),
        canLoad: [UsuarioGuard]
      },
      {
        path: 'herramientas',
        loadChildren: () => import('../../pages/herramientas/herramientas.module').then(m => m.HerramientasPageModule),
        canLoad: [UsuarioGuard]
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/perfil/perfil.module').then(m => m.PerfilPageModule),
            canLoad: [UsuarioGuard]
          },
          {
            path: 'panel-control',
            loadChildren: () => import('../../pages/panel-control/panel-control.module').then(m => m.PanelControlPageModule),
            canLoad: [UsuarioGuard]
          }

        ],
        canLoad: [UsuarioGuard]
      },
      {
        path: 'comunidad',
        loadChildren: () => import('../../pages/comunidad/comunidad.module').then(m => m.ComunidadPageModule),
        canLoad: [UsuarioGuard]
      },
      {
        path: 'buscar',
        loadChildren: () => import('../../pages/buscar/buscar.module').then(m => m.BuscarPageModule),
        canLoad: [UsuarioGuard]
      },

      {
        path: 'perfil/panel-control/usuarios-listado',
        loadChildren: () => import('../usuarios-listado/usuarios-listado.module').then(m => m.UsuariosListadoPageModule)
      },

      {
        path: 'perfil/panel-control/articulos-listado',
        loadChildren: () => import('../articulos-listado/articulos-listado.module').then(m => m.ArticulosListadoPageModule)
      },
      {
        path: '',
        redirectTo: '/aprender',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
