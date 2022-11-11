import { Pipe, PipeTransform } from '@angular/core';

import { Articulo } from '../interfaces/verArticulos';

@Pipe({
  name: 'articulosPipe'
})
export class ArticulosPipe implements PipeTransform {

  statusArticulos: boolean = true;

  transform(arreglo: Articulo[], texto: string = '', segmento: string = 'activos'): Articulo[] {
    try {

      if (segmento == 'activos') {
        this.statusArticulos = true;
      }

      if (segmento == 'borrados') {
        this.statusArticulos = false;
      }

      if (texto === '') {
        return arreglo.filter(item => item['estado'] == this.statusArticulos);
      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusArticulos);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosNombres = arreglo.filter(
        item => item['rol'].toLowerCase().includes(texto)
      );

      if (resultadosNombres.length > 0) {
        return resultadosNombres.filter(item => item['estado'] == this.statusArticulos);
      }

    } catch (error) {

    }
  }

}
