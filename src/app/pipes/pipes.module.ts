import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { ArticulosPipe } from './articulos.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    ArticulosPipe
  ],
  exports: [
    FiltroPipe,
    ArticulosPipe
  ]
})
export class PipesModule { }
