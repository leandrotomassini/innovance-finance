import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Role } from '../../interfaces/listarUsuarios';
import { ModalController } from '@ionic/angular';
import { RolesService } from '../../services/roles.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-rol-formulario',
  templateUrl: './rol-formulario.component.html',
  styleUrls: ['./rol-formulario.component.scss'],
})
export class RolFormularioComponent implements OnInit {

  @Input() rol: Role;

  public role: Role = {
    rol: '',
    estado: false,
    _id: '',
    __v: 0
  };

  rolFormulario: FormGroup = this.fb.group({
    rol: [, [Validators.required, Validators.minLength(3)]],
  });

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private rolService: RolesService, private wsService: WebsocketService) {
    if (this.rol) {
      this.role = this.rol;
    }
  }

  async ngOnInit() {

    if (this.rol != undefined) {
      if (this.rol._id != '') {
        await this.rolService.verRol(this.rol._id).subscribe((rol: Role) => {
          this.rolFormulario.reset({
            rol: rol.rol
          });
        });
      }
    }
  }

  campoEsValido(campo: string) {
    return this.rolFormulario.controls[campo].errors
      && this.rolFormulario.controls[campo].touched;
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  async guardar() {

    if (this.rolFormulario.invalid) {
      this.rolFormulario.markAllAsTouched();
      return;
    }
    if (this.rol != undefined) {
      if (this.rol._id) {
        this.rolService.actualizarRol(this.rolFormulario.value, this.rol._id).subscribe(() => {
          this.wsService.emit('listarRoles');
        });
      }
    } else {
      await this.rolService.crearRol(this.rolFormulario.value).subscribe(() => {
        this.wsService.emit('listarRoles');
      });
    }
    this.rolFormulario.reset();
    this.salirSinArgumentos();
  }


  activarRol(rolId: string) {
    this.rol.estado = true;
    this.rolService.actualizarRol(this.rol, this.rol._id).subscribe(() => {
      this.wsService.emit('listarRoles');
      this.modalCtrl.dismiss();
    });
  }
}
