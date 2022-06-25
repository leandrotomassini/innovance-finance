import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articulosFiltro'
})
export class ArticulosPipe implements PipeTransform {

  transform(arreglo: any[], texto: string = '', columna: string = ''): any[] {

    if (texto === '') {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter(
      (item) => {

        if (item['titulo'].toLowerCase().includes(texto)) {
          return item['titulo'].toLowerCase().includes(texto)
        }


        for (let i = 0; i < item['categorias'].length; i++) {
          if (item['categorias'][i].toLowerCase().includes(texto)) {
            return item['categorias'][i].toLowerCase().includes(texto)
          }
        }

      }
    );
  }

}
