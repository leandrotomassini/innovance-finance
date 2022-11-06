import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';


import { WebsocketService } from '../../services/websocket.service';


import { Subscriptor } from 'src/app/interfaces/subscriptores';

import { SubscriptoresService } from '../../services/subscriptores.service';
import { SubscriptorFormularioComponent } from '../subscriptor-formulario/subscriptor-formulario.component';


@Component({
  selector: 'app-subscriptores',
  templateUrl: './subscriptores.component.html',
  styleUrls: ['./subscriptores.component.scss'],
})
export class SubscriptoresComponent implements OnInit, OnDestroy {

  subscriptores: Subscriptor[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  subscriptoresSubscription: Subscription;

  constructor(private subscriptoresService: SubscriptoresService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarSubscriptores');

    this.subscriptoresSubscription = this.wsService.listen('subscriptoresActualizados')
      .subscribe(() => {
        this.subscriptoresService.obtenerSubscriptores().subscribe((subscriptores: Subscriptor[]) => {
          this.subscriptores = subscriptores;
        });
      });
  }

  ngOnDestroy(): void {
    this.subscriptoresSubscription.unsubscribe();
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  async editarSubscriptor(subscriptor: Subscriptor) {

    const modal = await this.modalCtrl.create({
      component: SubscriptorFormularioComponent,
      componentProps: {
        subscriptor
      }
    });

    await modal.present();
  }

  async nuevoSubscriptor() {
    const modal = await this.modalCtrl.create({
      component: SubscriptorFormularioComponent,
      componentProps: {
      }
    });

    await modal.present();
  }

  async borrarSubscripcion(subscriptor: Subscriptor) {

    const sub = {
      usuario: subscriptor.usuario.uid,
      vencimiento: subscriptor.vencimiento,
      estado: false
    };

    const alert = await this.alertCtrl.create({
      header: subscriptor.usuario.correo,
      mode: 'ios',
      message: '¿Estás seguro  de eliminar este subscriptor?',
      buttons: [
        {
          text: 'Sí, eliminar',
          handler: () => {
            subscriptor.estado = false;
            this.subscriptoresService.actualizarSubscriptor(sub, subscriptor._id)
              .subscribe(() => {
                this.wsService.emit('listarSubscriptores');
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
