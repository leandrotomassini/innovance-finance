import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Usuario, Role } from '../../interfaces/listarUsuarios';
import { WebsocketService } from '../../services/websocket.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss'],
})
export class UsuarioFormularioComponent implements OnInit {

  usuarioFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    correo: [, [Validators.required, Validators.min(0)]],
    rol: [, [Validators.required, Validators.min(0)]],
    img: [, [Validators.required, Validators.min(0)]]
  });

  @Input() usuarioId: string;

  public usuario: Usuario;
  public roles: Role[];

  loading: HTMLIonLoadingElement;

  constructor(private modalCtrl: ModalController, private usuarioService: UsuariosService, private loadingCtrl: LoadingController, private fb: FormBuilder, public wsService: WebsocketService) {

    this.usuario = {
      nombre: '',
      correo: '',
      img: '',
      rol: '',
      estado: false
    };

    this.usuarioFormulario.reset({
      nombre: '',
      correo: '@gmail.com',
      img: 'https://i.imgur.com/ZUu9nkH.png',
      rol: ''
    });

    // this.presentLoading();
  }

  async ngOnInit() {
    if (this.usuarioId) {
      await this.usuarioService.verUsuario(this.usuarioId).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        this.usuarioFormulario.reset({
          nombre: this.usuario.nombre,
          correo: this.usuario.correo,
          img: this.usuario.img,
          rol: this.usuario.rol
        });
      });
    }

    await this.usuarioService.obtenerRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
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

  campoEsValido(campo: string) {
    return this.usuarioFormulario.controls[campo].errors
      && this.usuarioFormulario.controls[campo].touched;
  }

  async guardar() {

    if (this.usuarioFormulario.invalid) {
      this.usuarioFormulario.markAllAsTouched();
      return;
    }

    if (this.usuarioId) {
      this.usuarioService.actualizarUsuario(this.usuarioFormulario.value, this.usuarioId).subscribe(() => {
        this.wsService.emit('listarUsuarios');
      });
    } else {
      await this.usuarioService.crearUsuario(this.usuarioFormulario.value).subscribe(() => {
        this.wsService.emit('listarUsuarios');
      });
    }

    this.usuarioFormulario.reset();
    this.salirSinArgumentos();
  }

  activarUsuario(uId: string) {
    this.usuario.estado = true;
    this.usuarioService.actualizarUsuario(this.usuario, this.usuario.uid).subscribe(() => {
      this.wsService.emit('listarUsuarios');
      this.modalCtrl.dismiss();
    });
  }

}
