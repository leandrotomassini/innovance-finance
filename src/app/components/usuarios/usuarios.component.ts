import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { Observable } from 'rxjs';

import { Usuario } from '../../interfaces/listarUsuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
    
  }
}
