import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }


  logout() {
    this.usuarioService.logout();
  }

}
