import { Pipe, PipeTransform } from '@angular/core';
import { Articulo } from '../interfaces/verArticulos';

@Pipe({
  name: 'articulosPublicadosActivos'
})
export class ArticulosPublicadosActivosPipe implements PipeTransform {

  transform(articulos: Articulo[]): Articulo[] {
    try {
      const articulosActivos = articulos.filter(item => item['estado'] == true && item['terminado'] == true);
      return articulosActivos;

    } catch (error) {

    }
  }

}
