import { Pipe, PipeTransform } from '@angular/core';

import { Usuario } from '../interfaces/listarUsuarios';

@Pipe({
  name: 'usuariosPipe'
})
export class UsuariosPipe implements PipeTransform {

  statusUsuarios: boolean = true;

  transform(arreglo: Usuario[], texto: string = '', segmento: string = 'activos'): Usuario[] {  

    try {

      if (segmento == 'activos') {
        this.statusUsuarios = true;
      }
      
      if (segmento == 'borrados') {
        this.statusUsuarios = false;
      }
      

      if (texto === '') {
        return arreglo.filter(item => item['estado'] == this.statusUsuarios);
      }

      if (!arreglo) {
        return arreglo.filter(item => item['estado'] == this.statusUsuarios);
      }

      texto = texto.toLocaleLowerCase();

      let resultadosCorreo = arreglo.filter(
        item => item['correo'].toLowerCase().includes(texto)
      );

      if (resultadosCorreo.length > 0) {
        return resultadosCorreo.filter(item => item['estado'] == this.statusUsuarios);
      }

      let resultadosNombre = arreglo.filter(
        item => item['nombre'].toLowerCase().includes(texto)
      );

      if (resultadosNombre.length > 0) {
        return resultadosNombre.filter(item => item['estado'] == this.statusUsuarios);
      }
    } catch (error) {

    }



  }

}
