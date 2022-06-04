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
  usuario: Usuario;
  usuarios: Usuario[];

  constructor(private http: HttpClient, private storage: Storage,
    private navCtrl: NavController) {
    this.storage.create();
  }

  login(correo: string, password: string) {

    const data = { correo, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/api/auth/login`, data).subscribe(resp => {
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

  logout() {
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async obtenerUsuarios() {

    await this.cargarToken();

    if (!this.token) {
      console.log('rechazado.');
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/api/usuarios?desde=0&limite=100 `, { headers })
        .subscribe(
          resp => {

            if (resp['ok']) {
              this.usuarios = resp['usuarios'];
              resolve(this.usuarios);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          }
        );
    }
    );
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);
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

}
