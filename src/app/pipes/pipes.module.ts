import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';
import { RolesPipe } from './roles.pipe';


@NgModule({
  declarations: [
    UsuariosPipe,
    RolesPipe
  ],
  exports: [
    UsuariosPipe,
    RolesPipe
  ]
})
export class PipesModule { }
