import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';


import { WebsocketService } from '../../services/websocket.service';

import { Role } from '../../interfaces/listarUsuarios';
import { RolesService } from '../../services/roles.service';
import { RolFormularioComponent } from '../rol-formulario/rol-formulario.component';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Role[];
  textoBuscar: string = '';
  segmento: string = 'activos';

  rolesSubscription: Subscription;

  constructor(private rolesService: RolesService, private modalCtrl: ModalController, private wsService: WebsocketService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.wsService.emit('listarRoles');

    this.rolesSubscription = this.wsService.listen('rolesActualizados')
      .subscribe(() => {
        this.rolesService.obtenerRoles().subscribe((roles: Role[]) => {
          this.roles = roles;
        });
      });

  }

  ngOnDestroy(): void {

  }

  segmentChanged(event) {
    this.segmento = event.detail.value;
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }

  async editarRol(rol) {

    const modal = await this.modalCtrl.create({
      component: RolFormularioComponent,
      componentProps: {
        rol
      }
    });

    await modal.present();
  }

  async nuevoRol() {
    const modal = await this.modalCtrl.create({
      component: RolFormularioComponent,
      componentProps: {
      }
    });

    await modal.present();
  }

  async borrarRol(rol: Role) {

    const alert = await this.alertCtrl.create({
      header: rol.rol,
      mode: 'ios',
      message: '¿Estás seguro  de eliminar este rol?',
      buttons: [
        {
          text: 'Sí, eliminar',
          handler: () => {
            rol.estado = false;
            this.rolesService.actualizarRol(rol, rol._id).subscribe(() => {
              this.wsService.emit('listarRoles');
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
