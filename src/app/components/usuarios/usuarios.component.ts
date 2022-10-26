import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/listarUsuarios';

import { UsuarioFormularioComponent } from '../usuario-formulario/usuario-formulario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  constructor(private usuarioService: UsuarioService, private modalCtrl: ModalController) { }

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

  async editarUsuario(usuarioId) {

    const modal = await this.modalCtrl.create({
      component: UsuarioFormularioComponent,
      componentProps: {
        usuarioId: usuarioId
      }
    });

    await modal.present();
  }
}
