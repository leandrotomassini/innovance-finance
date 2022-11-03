import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';


import { WebsocketService } from '../../services/websocket.service';
import { SubscripcionesService } from '../../services/subscripciones.service';

import { Subscripcion } from '../../interfaces/listarSubscripciones';

@Component({
  selector: 'app-subscripcion-formulario',
  templateUrl: './subscripcion-formulario.component.html',
  styleUrls: ['./subscripcion-formulario.component.scss'],
})
export class SubscripcionFormularioComponent implements OnInit {

  @Input() subscripcion: Subscripcion;

  public subscripcionData: Subscripcion = {
    titulo: '',
    precio: '',
    estado: false,
    _id: '',
    __v: 0
  };

  subscripcionFormulario: FormGroup = this.fb.group({
    titulo: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.minLength(1)]],
  });

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private subscripcionService: SubscripcionesService, private wsService: WebsocketService) {
    if (this.subscripcion) {
      this.subscripcionData = this.subscripcion;
    }
  }

  async ngOnInit() {
    

    if (this.subscripcion != undefined) {
      if (this.subscripcion._id != '') {
        await this.subscripcionService.verSubscripcion(this.subscripcion._id)
          .subscribe((subscripcion: Subscripcion) => {
            this.subscripcionFormulario.reset({
              titulo: subscripcion.titulo,
              precio: subscripcion.precio
            });
          });
      }
    }

  }

  campoEsValido(campo: string) {
    return this.subscripcionFormulario.controls[campo].errors
      && this.subscripcionFormulario.controls[campo].touched;
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  async guardar() {

    if (this.subscripcionFormulario.invalid) {
      this.subscripcionFormulario.markAllAsTouched();
      return;
    }
    if (this.subscripcion != undefined) {
      if (this.subscripcion._id) {
        this.subscripcionService.actualizarSubscripcion(this.subscripcionFormulario.value, this.subscripcion._id)
          .subscribe(() => {
            this.wsService.emit('listarSubscripciones');
          });
      }
    } else {
      await this.subscripcionService.crearSubscripcion(this.subscripcionFormulario.value)
        .subscribe(() => {
          this.wsService.emit('listarSubscripciones');
        });
    }
    this.subscripcionFormulario.reset();
    this.salirSinArgumentos();
  }


  activarSubscripcion(subscripcionId: string) {
    this.subscripcion.estado = true;
    this.subscripcionService.actualizarSubscripcion(this.subscripcion, this.subscripcion._id)
      .subscribe(() => {
        this.wsService.emit('listarSubscripciones');
        this.modalCtrl.dismiss();
      });
  }

}
