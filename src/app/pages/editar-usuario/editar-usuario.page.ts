// TODO: Cambiar contraseña
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

export interface USR {
  img: string;
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
}


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  usuario: any;

  usuarioFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.minLength(8)]],
    img: ['', [Validators.required, Validators.minLength(3)]],
    rol: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['', [Validators.required, Validators.minLength(3)]],
    google: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    public usuariosService: UsuarioService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.usuario = {
      img: '',
      rol: '',
      estado: false,
      google: false,
      nombre: '',
      correo: '',
      uid: '',
    };
  }

  async ngOnInit() {

    await this.usuariosService.obtenerUsuario(this.rutaActiva.snapshot.params.idusuario).then(usuario => {
      this.usuario = usuario;
    });

    this.usuarioFormulario.reset({
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      img: this.usuario.img,
      rol: this.usuario.rol,
      estado: this.usuario.estado,
      google: this.usuario.google,
    });
  }

  campoEsValido(campo: string) {
    return this.usuarioFormulario.controls[campo].errors && this.usuarioFormulario.controls[campo].touched;
  }

  async guardar() {

    if (this.usuarioFormulario.invalid) {
      this.usuarioFormulario.markAllAsTouched();
      return;
    }
    
    await this.usuariosService.editarUsuario(this.usuario.uid, this.usuarioFormulario.value).then();
  }

}
