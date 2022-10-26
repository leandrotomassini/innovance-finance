import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario, VerUsuario } from '../../interfaces/listarUsuarios';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss'],
})
export class UsuarioFormularioComponent implements OnInit {

  @Input() usuarioId: string;

  public usuario: Usuario;
  loading: HTMLIonLoadingElement;

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService, private loadingCtrl: LoadingController) {

    this.usuario = {
      nombre: '',
      correo: '',
      img: '',
      rol: '',
      estado: false
    };

    this.presentLoading();
  }

  async ngOnInit() {
    await this.usuarioService.verUsuario(this.usuarioId).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
    this.loading.dismiss();
    });
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  async presentLoading() {

    this.loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      mode: 'ios'
    });

    await this.loading.present();
  }

}
