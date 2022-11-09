import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ListarUsuarios, VerRoles, VerUsuario } from '../interfaces/listarUsuarios';

import { Usuario } from '../models/usuario';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }


  loginGoogle(token: string) {
    return this.http.post(`${base_url}/api/auth/google`, { 'id_token': token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  logout() {
    // TODO: Revisar porque lanza un error cuando salis, cambiar email
    localStorage.removeItem('token');

    google.accounts.id.revoke(this.usuario.correo, () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        const { nombre, correo, img, rol, estado, uid } = resp.usuario;
        this.usuario = new Usuario(nombre, correo, img, rol, estado, uid);
        localStorage.setItem('token', resp.token);
      }),
      map(resp => {
        return true;
      }),
      catchError(error => of(false))
    );
  }

  listarUsuarios() {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/usuarios/`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: ListarUsuarios) => {
        return resp.usuarios;
      }),
      catchError(error => of(false))
    );
  }

  verUsuario(uid) {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/usuarios/${uid}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: VerUsuario) => {
        return resp.usuario;
      }),
      catchError(error => of(false))
    );
  }

  obtenerRoles() {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/roles/`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: VerRoles) => {
        return resp.roles;
      }),
      catchError(error => of(false))
    );

  }

  crearUsuario(usuario: Usuario) {

    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/api/usuarios/`, usuario, {
      headers: {
        'x-token': token
      }
    });
  }

  actualizarUsuario(usuario: Usuario, uid: string) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/api/usuarios/${uid}`, usuario, {
      headers: {
        'x-token': token
      }
    });
  }

}
