import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

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

        if(item['nombre'].toLowerCase().includes(texto)){
          return item['nombre'].toLowerCase().includes(texto)
        }

        if(item['correo'].toLowerCase().includes(texto)){
          return item['correo'].toLowerCase().includes(texto)
        }

        if(item['rol'].toLowerCase().includes(texto)){
          return item['rol'].toLowerCase().includes(texto)
        }

      }
    );
  }

}
