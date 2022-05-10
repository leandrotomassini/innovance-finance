import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'estudiar',
        loadChildren: () => import('../../pages/estudiar/estudiar.module').then( m => m.EstudiarPageModule)
      },
      {
        path: 'explorar',
        loadChildren: () => import('../../pages/explorar/explorar.module').then( m => m.ExplorarPageModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../../pages/blog/blog.module').then( m => m.BlogPageModule)
      },
      {
        path: 'herramientas',
        loadChildren: () => import('../../pages/herramientas/herramientas.module').then( m => m.HerramientasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/estudiar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
