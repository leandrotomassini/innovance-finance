import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public panelDeControl: string = '/perfil/panel-control';
  public usuario: User;


  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    this.usuarioService.validaToken();
  }

  logout() {
    this.usuarioService.logout();
  }

}
