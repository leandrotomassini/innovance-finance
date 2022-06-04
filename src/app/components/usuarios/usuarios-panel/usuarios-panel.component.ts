import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-usuarios-panel',
  templateUrl: './usuarios-panel.component.html',
  styleUrls: ['./usuarios-panel.component.scss'],
})
export class UsuariosPanelComponent implements OnInit {

  usuarios: any;

  constructor(public usuariosService: UsuarioService) { }

  ngOnInit() {
    this.usuariosService.obtenerUsuarios().then(usuariosArr => {
     this.usuarios = usuariosArr;
    });
  }

}
