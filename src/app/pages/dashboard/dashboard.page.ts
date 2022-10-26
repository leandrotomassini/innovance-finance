import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }


  logout() {
    this.router.navigateByUrl('/login');
    this.usuarioService.logout();
  }

}
