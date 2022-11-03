import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';


import { WebsocketService } from '../../services/websocket.service';


import { Subscripcion } from '../../interfaces/listarSubscripciones';
import { SubscripcionesService } from '../../services/subscripciones.service';
import { SubscripcionFormularioComponent } from '../subscripcion-formulario/subscripcion-formulario.component';


@Component({
  selector: 'app-subscripciones',
  templateUrl: './subscripciones.component.html',
  styleUrls: ['./subscripciones.component.scss'],
})
export class SubscripcionesComponent implements OnInit, OnDestroy {

  subscripciones: Subscripcion[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  subscripcionesSubscription: Subscription;

  constructor(private subscripcionesService: SubscripcionesService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarSubscripciones');

    this.subscripcionesSubscription = this.wsService.listen('subscripcionesActualizadas')
      .subscribe(() => {
        this.subscripcionesService.obtenerSubscripciones().subscribe((subscripciones: Subscripcion[]) => {
          this.subscripciones = subscripciones;
        });
      });
  }

  ngOnDestroy(): void {
    this.subscripcionesSubscription.unsubscribe();
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  async editarSubscripcion(subscripcion: Subscripcion) {

    const modal = await this.modalCtrl.create({
      component: SubscripcionFormularioComponent,
      componentProps: {
        subscripcion
      }
    });

    await modal.present();
  }

  async nuevaSubscripcion() {
    const modal = await this.modalCtrl.create({
      component: SubscripcionFormularioComponent,
      componentProps: {
      }
    });

    await modal.present();
  }

  async borrarSubscripcion(subscripcion: Subscripcion) {

    const alert = await this.alertCtrl.create({
      header: subscripcion.titulo,
      mode: 'ios',
      message: '¿Estás seguro  de eliminar esta subscripción?',
      buttons: [
        {
          text: 'Sí, eliminar',
          handler: () => {
            subscripcion.estado = false;
            this.subscripcionesService.actualizarSubscripcion(subscripcion, subscripcion._id).subscribe(() => {
              this.wsService.emit('listarSubscripciones');
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
