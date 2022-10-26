import { NgModule } from '@angular/core';

import { UsuariosPipe } from './usuarios.pipe';


@NgModule({
  declarations: [
    UsuariosPipe
  ],
  exports: [
    UsuariosPipe
  ]
})
export class PipesModule { }
