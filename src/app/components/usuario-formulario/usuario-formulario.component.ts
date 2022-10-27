import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario, Role } from '../../interfaces/listarUsuarios';

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

  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService, private loadingCtrl: LoadingController, private fb: FormBuilder) {

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
    })

    // this.presentLoading();
  }

  async ngOnInit() {
    await this.usuarioService.verUsuario(this.usuarioId).subscribe((usuario: Usuario) => {
      this.usuario = usuario;
      // this.loading.dismiss();
    });

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

    await this.usuarioService.crearUsuario(this.usuarioFormulario.value).subscribe(console.log);
    this.usuarioFormulario.reset();
  }

}
