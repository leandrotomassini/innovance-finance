import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  usuario: Usuario = {};

  constructor(private http: HttpClient, private storage: Storage,
    private navCtrl: NavController) {
    this.storage.create();
  }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {

      this.http.post(`${URL}/user/login`, data).subscribe(resp => {
        // TODO: En la respuesta debe venir un ok!
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });

    });
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers })
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

}
