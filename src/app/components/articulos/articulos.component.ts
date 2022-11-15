import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { WebsocketService } from '../../services/websocket.service';
import { ArticulosService } from '../../services/articulos.service';

import { Articulo } from '../../interfaces/verArticulos';

import { ArticuloFormularioComponent } from '../articulo-formulario/articulo-formulario.component';


@Component({
  selector: 'app-articulos-component',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
})
export class ArticulosComponent implements OnInit, OnDestroy {

  articulos: Articulo[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  articulosSubscription: Subscription;

  constructor(private articulosService: ArticulosService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarArticulos');

    this.articulosSubscription = this.wsService.listen('articulosActualizados')
      .subscribe(() => {
        this.articulosService.obtenerArticulos().subscribe((articulos: Articulo[]) => {
          this.articulos = articulos;
        });
      });
  }

  ngOnDestroy(): void {
    this.articulosSubscription.unsubscribe();
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

  async nuevoArticulo() {
    const modal = await this.modalCtrl.create({
      component: ArticuloFormularioComponent,
      componentProps: {
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
