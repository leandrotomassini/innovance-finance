import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { Usuario } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  token: string = null;
  usuario: Usuario;


  constructor(public http: HttpClient,
    private navCtrl: NavController, private storage: Storage) {
    this.cargarToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token');
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      console.log('rechazado.');
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/api/auth`, { headers })
        .subscribe(
          resp => {

            if (resp['ok']) {
              // El usuario es la respuesta del backend
              // al recibir un token
              this.usuario = resp['usuario'];
              resolve(true);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          }
        );
    }
    );

  }

  async crearArticulo() {
    await this.validaToken();
    console.log(this.usuario);

    // const headers = new HttpHeaders({
    //   'x-token': this.token
    // });

    // return new Promise(resolve => {



    //   this.http.post(`${URL}/api/posts`, informacion, { headers })
    //     .subscribe(resp => {
    //       resolve(true);
    //     });
    // });
  }


}
