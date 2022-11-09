import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

import { WebsocketService } from '../../services/websocket.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Usuario } from '../../interfaces/listarUsuarios';

import { UsuarioFormularioComponent } from '../usuario-formulario/usuario-formulario.component';

@Component({
  selector: 'app-usuarios-component',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  usuariosSubscription: Subscription;

  constructor(private usuarioService: UsuariosService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarUsuarios');

    this.usuariosSubscription = this.wsService.listen('usuariosActualizados')
      .subscribe(() => {
        this.usuarioService.listarUsuarios().subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
        });
      });
  }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
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

  async nuevoUsuario() {
    const modal = await this.modalCtrl.create({
      component: UsuarioFormularioComponent,
      componentProps: {
      }
    });

    await modal.present();
  }

  async borrarUsuario(usuario: Usuario) {

    const alert = await this.alertCtrl.create({
      header: usuario.correo,
      subHeader: usuario.nombre,
      message: '¿Estás seguro  de eliminar este usuario?',
      mode: 'ios',
      buttons: [
        {
          text: 'Sí, eliminar',
          handler: () => {
            usuario.estado = false;
            this.usuarioService.actualizarUsuario(usuario, usuario.uid).subscribe(() => {
              this.wsService.emit('listarUsuarios');
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'rojo'
        }
      ]
    });

    await alert.present();
  }
}
