import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';
import { RolesPipe } from './roles.pipe';
import { SubscripcionesPipe } from './subscripciones.pipe';
import { SubscriptoresPipe } from './subscriptores.pipe';
import { ArticulosPipe } from './articulos.pipe';
import { ArticulosPublicadosPipe } from './articulos-publicados.pipe';
import { SubscripcionPublicadosPipe } from './subscripcion-publicados.pipe';
import { ArticulosPublicadosActivosPipe } from './articulos-publicados-activos.pipe';


@NgModule({
  declarations: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
    ArticulosPipe,
    ArticulosPublicadosPipe,
    SubscripcionPublicadosPipe,
    ArticulosPublicadosActivosPipe,
  ],
  exports: [
    UsuariosPipe,
    RolesPipe,
    SubscripcionesPipe,
    SubscriptoresPipe,
    ArticulosPipe,
    SubscripcionPublicadosPipe
  ]
})
export class PipesModule { }
