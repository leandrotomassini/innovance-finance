import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { VerRoles, Role } from '../interfaces/listarUsuarios';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RolesService {


  constructor(private http: HttpClient) { }

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

  actualizarRol(rol: Role, rolId: string) {

    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/api/roles/${rolId}`, rol, {
      headers: {
        'x-token': token
      }
    });
  }

  verRol(uid) {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/roles/${uid}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        return resp.rol;
      }),
      catchError(error => of(false))
    );
  }

  crearRol(rol: Role) {

    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/api/roles/`, rol, {
      headers: {
        'x-token': token
      }
    });
  }
}
