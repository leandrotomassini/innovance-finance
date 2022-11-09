import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


import { WebsocketService } from '../../services/websocket.service';


import { Usuario } from '../../interfaces/listarUsuarios';
import { Subscription } from 'rxjs';
import { Subscriptor } from '../../interfaces/subscriptores';
import { SubscriptoresService } from '../../services/subscriptores.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-subscriptor-formulario',
  templateUrl: './subscriptor-formulario.component.html',
  styleUrls: ['./subscriptor-formulario.component.scss'],
})
export class SubscriptorFormularioComponent implements OnInit, OnDestroy {

  @Input() subscriptor: Subscriptor;

  usuariosSubscription: Subscription;

  usuarios: Usuario[];

  subscriptorFormulario: FormGroup = this.fb.group({
    usuario: [, [Validators.required, Validators.minLength(3)]],
    vencimiento: [, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private subscriptorService: SubscriptoresService, private wsService: WebsocketService, private usuarioService: UsuariosService) { }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }

  async ngOnInit() {

    if (this.subscriptor != undefined) {
      if (this.subscriptor._id != '') {
        await this.subscriptorService.verSubscripcion(this.subscriptor._id)
          .subscribe((subscriptor: Subscriptor) => {
            this.subscriptorFormulario.reset({
              usuario: subscriptor.usuario.uid,
              vencimiento: subscriptor.vencimiento
            });
          });
      }
    }

    this.wsService.emit('listarUsuarios');

    this.usuariosSubscription = this.wsService.listen('usuariosActualizados')
      .subscribe(() => {
        this.usuarioService.listarUsuarios()
          .subscribe((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
          });
      });
  }

  campoEsValido(campo: string) {
    return this.subscriptorFormulario.controls[campo].errors
      && this.subscriptorFormulario.controls[campo].touched;
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  async guardar() {
    
    if (this.subscriptorFormulario.invalid) {
      this.subscriptorFormulario.markAllAsTouched();
      return;
    }
    if (this.subscriptor != undefined) {
      if (this.subscriptor._id) {
        this.subscriptorService.actualizarSubscriptor(this.subscriptorFormulario.value, this.subscriptor._id)
          .subscribe(() => {
            this.wsService.emit('listarSubscriptores');
          });
      }
    } else {
      await this.subscriptorService.crearSubscripcion(this.subscriptorFormulario.value)
        .subscribe(() => {
          this.wsService.emit('listarSubscriptores');
        });
    }
    this.subscriptorFormulario.reset();
    this.salirSinArgumentos();

  }


  activarSubscripcion(subscripcionId: string) {
    this.subscriptor.estado = true;
    this.subscriptorService.actualizarSubscriptor(this.subscriptor, this.subscriptor._id)
      .subscribe(() => {
        this.wsService.emit('listarSubscriptores');
        this.modalCtrl.dismiss();
      });
  }

}
