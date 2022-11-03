import { Pipe, PipeTransform } from '@angular/core';
import { Subscripcion } from '../interfaces/listarSubscripciones';

@Pipe({
  name: 'subscripcionesPipe'
})
export class SubscripcionesPipe implements PipeTransform {
  statusSubscripcion: boolean = true;

  transform(arreglo: Subscripcion[], texto: string = '', segmento: string = 'activos'): Subscripcion[] {
    try {
      

      if (segmento == 'activos') {
        this.statusSubscripcion = true;
      }

      if (segmento == 'borrados') {
        this.statusSubscripcion = false;
      }

      if (texto === '') {
        return arreglo.filter(item => item['estado'] == this.statusSubscripcion);
      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusSubscripcion);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosNombres = arreglo.filter(
        item => item['titulo'].toLowerCase().includes(texto)
      );

      if (resultadosNombres.length > 0) {
        return resultadosNombres.filter(item => item['estado'] == this.statusSubscripcion);
      }

    } catch (error) {

    }
  }

}
