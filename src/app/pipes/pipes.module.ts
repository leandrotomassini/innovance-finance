import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';
import { RolesPipe } from './roles.pipe';
import { SubscripcionesPipe } from './subscripciones.pipe';


@NgModule({
  declarations: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe
  ],
  exports: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe
  ]
})
export class PipesModule { }
