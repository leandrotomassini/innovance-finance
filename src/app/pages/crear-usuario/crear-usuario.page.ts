import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  usuario: any;

  usuarioFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.minLength(8)]],
    img: ['', [Validators.required, Validators.minLength(3)]],
    rol: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['', [Validators.required, Validators.minLength(3)]],
    google: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    public usuariosService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.usuario = {
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      rol: 'ADMINISTRADOR',
      estado: true,
      google: false,
      nombre: '',
      correo: '',
      uid: '',
    };
  }

  async ngOnInit() {
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
    this.usuariosService.crearUsuario(this.usuarioFormulario.value).then(console.log);

  }

}
