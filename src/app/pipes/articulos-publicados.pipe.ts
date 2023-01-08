import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from '../interfaces/verArticulos';

@Pipe({
  name: 'articulosPublicadosPipe'
})
export class ArticulosPublicadosPipe implements PipeTransform {

  transform(arreglo: Articulo[]) : Articulo[] {
    try {

      return arreglo.filter(item => item['estado'] == true && item['terminado'] == true);

    } catch (error) {

    }
  }

}
