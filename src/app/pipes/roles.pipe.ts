import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../interfaces/listarUsuarios';

@Pipe({
  name: 'rolesPipe'
})
export class RolesPipe implements PipeTransform {

  statusRoles: boolean = true;

  transform(arreglo: Role[], texto: string = '', segmento: string = 'activos'): Role[] {
    try {

      if (segmento == 'activos') {
        this.statusRoles = true;
      }

      if (segmento == 'borrados') {
        this.statusRoles = false;
      }

      if (texto === '') {
        return arreglo.filter(item => item['estado'] == this.statusRoles);
      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusRoles);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosNombres = arreglo.filter(
        item => item['rol'].toLowerCase().includes(texto)
      );

      if (resultadosNombres.length > 0) {
        return resultadosNombres.filter(item => item['estado'] == this.statusRoles);
      }

    } catch (error) {

    }
  }
}