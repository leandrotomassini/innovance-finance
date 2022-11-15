import { Pipe, PipeTransform } from '@angular/core';

import { Articulo } from '../interfaces/verArticulos';

@Pipe({
  name: 'articulosPipe'
})
export class ArticulosPipe implements PipeTransform {

  statusArticulos: boolean = true;



  transform(arreglo: Articulo[], texto: string = '', segmento: string = 'activos'): Articulo[] {
    try {

      if (segmento == 'borradores') {
        let arregloActivos = arreglo.filter(item => item['estado'] == this.statusArticulos);
        return arregloActivos.filter(item => item['terminado'] == false);
      }

      if (segmento == 'activos') {
        this.statusArticulos = true;
      }

      if (segmento == 'borrados') {
        this.statusArticulos = false;
      }

      if (texto === '') {

        let arregloActivos = arreglo.filter(item => item['estado'] == this.statusArticulos);

        if (segmento == 'activos') {
          return arregloActivos.filter(item => item['terminado'] == true);
        }

        if (segmento == 'borradores') {
          return arregloActivos.filter(item => (item['terminado'] == false && item['estado'] == true));
        }

        if (segmento == 'borrados') {
          return arregloActivos;
        }

      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusArticulos);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosNombres = arreglo.filter(
        item => item['titulo'].toLowerCase().includes(texto)
      );

      if (resultadosNombres.length > 0) {
        return resultadosNombres.filter(item => item['estado'] == this.statusArticulos);
      }

    } catch (error) {

    }
  }

}
