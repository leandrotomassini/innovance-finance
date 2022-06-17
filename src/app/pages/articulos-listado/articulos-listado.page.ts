import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { NuevoArticuloPage } from '../nuevo-articulo/nuevo-articulo.page';

@Component({
  selector: 'app-articulos-listado',
  templateUrl: './articulos-listado.page.html',
  styleUrls: ['./articulos-listado.page.scss'],
})
export class ArticulosListadoPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async nuevoArticulo(idUsuarioEditar: string) {

    const modal = await this.modalController.create({
      component: NuevoArticuloPage,
      componentProps: {
        idUsuarioEditar: idUsuarioEditar
      }
    });

    await modal.present();

    // const { data } = await modal.onDidDismiss();
    const { data } = await modal.onWillDismiss();
    this.obtenerArticulos();
  }

  obtenerArticulos() { }

}
