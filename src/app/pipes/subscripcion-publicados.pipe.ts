import { Pipe, PipeTransform } from '@angular/core';

import { Subscripcion } from '../interfaces/listarSubscripciones';

@Pipe({
  name: 'subscripcionPublicadosPipe'
})
export class SubscripcionPublicadosPipe implements PipeTransform {

  transform(arreglo: Subscripcion[]): Subscripcion[] {
    try {
      return arreglo.filter(item => item['estado'] == true);
    } catch (error) {

    }
  }

}
