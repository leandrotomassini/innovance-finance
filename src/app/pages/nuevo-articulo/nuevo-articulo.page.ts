import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.page.html',
  styleUrls: ['./nuevo-articulo.page.scss']
})
export class NuevoArticuloPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  salirSinArgumentos() {
    this.modalController.dismiss();
  }


}
