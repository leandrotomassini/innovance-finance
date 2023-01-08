import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { WebsocketService } from '../../services/websocket.service';
import { ArticulosService } from '../../services/articulos.service';

import { Articulo } from '../../interfaces/verArticulos';

import { ArticuloFormularioComponent } from '../articulo-formulario/articulo-formulario.component';
import { SubscripcionesService } from '../../services/subscripciones.service';
import { Subscripcion } from '../../interfaces/listarSubscripciones';
import { ArticuloPublicadoFormularioComponent } from '../articulo-publicado-formulario/articulo-publicado-formulario.component';



@Component({
  selector: 'app-articulos-publicados',
  templateUrl: './articulos-publicados.component.html',
  styleUrls: ['./articulos-publicados.component.scss'],
})
export class ArticulosPublicadosComponent implements OnInit {

  articulos: Articulo[];
  subscripciones: Subscripcion[];

  textoBuscar: string = '';
  segmento: string = 'activos';

  articulosSubscription: Subscription;
  subscripcionesSubscription: Subscription;

  constructor(private suscripcionesService: SubscripcionesService, private articulosService: ArticulosService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarArticulos');

    this.articulosSubscription = this.wsService.listen('articulosActualizados')
      .subscribe(() => {
        this.articulosService.obtenerArticulos().subscribe((articulos: Articulo[]) => {
          this.articulos = articulos;
        });
      });

    this.wsService.emit('listarSubscripciones');

    this.subscripcionesSubscription = this.wsService.listen('subscripcionesActualizadas')
      .subscribe(() => {
        this.suscripcionesService.obtenerSubscripciones()
          .subscribe((subscripciones: Subscripcion[]) => {
            this.subscripciones = subscripciones;
          });
      });
  }

  ngOnDestroy(): void {
    this.articulosSubscription.unsubscribe();
    this.subscripcionesSubscription.unsubscribe();
  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  async editarArticulo(articulo: Articulo) {

    const modal = await this.modalCtrl.create({
      component: ArticuloFormularioComponent,
      componentProps: {
        articulo
      }
    });

    await modal.present();
  }

  async verPublicadosSubscripcion(subscripcion: String) {
    const modal = await this.modalCtrl.create({
      component: ArticuloPublicadoFormularioComponent,
      componentProps: {
        subscripcion
      }
    });

    await modal.present();
  }

  async borrarArticulo(articulo: Articulo) {

    const alert = await this.alertCtrl.create({
      header: articulo.titulo,
      message: '¿Estás seguro  de eliminar este artículo?',
      mode: 'ios',
      buttons: [
        {
          text: 'Sí, eliminar',
          handler: () => {
            articulo.estado = false;
            this.articulosService.actualizarArticulo(articulo, articulo._id)
              .subscribe(() => {
                this.wsService.emit('listarArticulos');
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
