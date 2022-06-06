import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { UsuarioService } from 'src/app/services/usuario.service';
import { CrearUsuarioPage } from '../crear-usuario/crear-usuario.page';
import { EditarUsuarioPage } from '../editar-usuario/editar-usuario.page';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.scss'],
})
export class UsuariosListadoPage implements OnInit {

  usuarios: any;
  usuarioBuscar: string = '';

  constructor(
    public usuariosService: UsuarioService,
    public alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  onSearchChange(event) {
    this.obtenerUsuarios();
    this.usuarioBuscar = event.detail.value;
  }

  async obtenerUsuarios() {
    await this.usuariosService.obtenerUsuarios().then(usuariosArr => {
      this.usuarios = usuariosArr;
    });
  }

  async presentAlert(nombre: string, idUsuario: string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: `Borrar a ${nombre}`,
      message: `¿Está seguro de borrar al usuario ${nombre}?`,
      buttons: [
        {
          text: 'Borrar',
          handler: async () => {
            await this.borrarUsuario(idUsuario);
            await this.obtenerUsuarios();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        },
      ],
      mode: "ios"
    });

    await alert.present();
  }

  async borrarUsuario(idUsuario: string) {
    await this.usuariosService.borrarUsuario(idUsuario).then(console.log);
  }

  async mostrarModal(idUsuarioEditar: string) {

    const modal = await this.modalController.create({
      component: EditarUsuarioPage,
      componentProps: {
        idUsuarioEditar: idUsuarioEditar
      }
    });

    await modal.present();

    // const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    this.obtenerUsuarios();

  }

  async mostrarCrearUsuario() {

    const modal = await this.modalController.create({
      component: CrearUsuarioPage
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.obtenerUsuarios();
  }
}
