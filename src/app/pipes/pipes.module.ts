import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';
import { RolesPipe } from './roles.pipe';
import { SubscripcionesPipe } from './subscripciones.pipe';
import { SubscriptoresPipe } from './subscriptores.pipe';


@NgModule({
  declarations: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
  ],
  exports: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
  ]
})
export class PipesModule { }
