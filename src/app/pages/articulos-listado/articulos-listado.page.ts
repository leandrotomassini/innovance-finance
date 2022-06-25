import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticuloService } from 'src/app/services/articulo.service';

import { NuevoArticuloPage } from '../nuevo-articulo/nuevo-articulo.page';

@Component({
  selector: 'app-articulos-listado',
  templateUrl: './articulos-listado.page.html',
  styleUrls: ['./articulos-listado.page.scss'],
})
export class ArticulosListadoPage implements OnInit {

  articulos: any;
  articuloBuscar: string = '';

  constructor(public modalController: ModalController, public articulosService: ArticuloService) { }

  async ngOnInit() {
    await this.obtenerArticulos();
  }

  async nuevoArticulo(idUsuarioEditar: string) {

    const modal = await this.modalController.create({
      component: NuevoArticuloPage,
      componentProps: {
        idUsuarioEditar: idUsuarioEditar
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    await this.obtenerArticulos();
  }

  async obtenerArticulos() {
    this.articulos = await this.articulosService.obtenerArticulos().then(this.articulos);
    this.articulos = await this.articulosService.obtenerArticulos().then(this.articulos);
  }

  onSearchChange(event) {
    this.obtenerArticulos();
    this.articuloBuscar = event.detail.value;
  }

}
