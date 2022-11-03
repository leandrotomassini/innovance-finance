import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { of } from 'rxjs';
import { ListarSubscripciones, Subscripcion } from '../interfaces/listarSubscripciones';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubscripcionesService {

  constructor(private http: HttpClient) { }

  obtenerSubscripciones() {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/subscripciones/`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: ListarSubscripciones) => {
        return resp.subscripciones;
      }),
      catchError(error => of(false))
    );
  }

  actualizarSubscripcion(subscripcion: Subscripcion, subscripcionId: string) {

    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/api/subscripciones/${subscripcionId}`, subscripcion, {
      headers: {
        'x-token': token
      }
    });
  }

  verSubscripcion(subscripcionId) {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/subscripciones/${subscripcionId}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        return resp.subscripcion;
      }),
      catchError(error => of(false))
    );
  }

  crearSubscripcion(subscripcion: Subscripcion) {

    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/api/subscripciones/`, subscripcion, {
      headers: {
        'x-token': token
      }
    });
  }
}
