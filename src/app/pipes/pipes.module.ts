import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';
import { RolesPipe } from './roles.pipe';
import { SubscripcionesPipe } from './subscripciones.pipe';
import { SubscriptoresPipe } from './subscriptores.pipe';
import { ArticulosPipe } from './articulos.pipe';


@NgModule({
  declarations: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
    ArticulosPipe,
  ],
  exports: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
    ArticulosPipe
  ]
})
export class PipesModule { }
