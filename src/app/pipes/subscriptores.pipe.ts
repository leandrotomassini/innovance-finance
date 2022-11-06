import { Pipe, PipeTransform } from '@angular/core';
import { Subscriptor } from '../interfaces/subscriptores';

@Pipe({
  name: 'subscriptoresPipe'
})
export class SubscriptoresPipe implements PipeTransform {

  statusSubscriptor: boolean = true;

  transform(arreglo: Subscriptor[], texto: string = '', segmento: string = 'activos'): Subscriptor[] {
    try {


      if (segmento == 'activos') {
        this.statusSubscriptor = true;
      }

      if (segmento == 'borrados') {
        this.statusSubscriptor = false;
      }

      if (texto === '') {
        return arreglo.filter(item => item['estado'] == this.statusSubscriptor);
      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusSubscriptor);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosNombres = arreglo.filter(
        item => item['usuario.correo'].toLowerCase().includes(texto)
      );

      if (resultadosNombres.length > 0) {
        return resultadosNombres.filter(item => item['estado'] == this.statusSubscriptor);
      }

    } catch (error) {

    }
  }
}
