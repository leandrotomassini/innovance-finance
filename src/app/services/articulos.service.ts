import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { VerArticulos, Articulo, VerArticulo } from '../interfaces/verArticulos';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {


  constructor(private http: HttpClient) { }

  obtenerArticulos() {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/articulos/`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: VerArticulos) => {
        return resp.articulos;
      }),
      catchError(error => of(false))
    );
  }

  actualizarArticulo(articulo: Articulo, auticuloId: string) {

    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/api/articulos/${auticuloId}`, articulo, {
      headers: {
        'x-token': token
      }
    });
  }

  verArticulo(articuloId) {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/articulos/${articuloId}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: VerArticulo) => {
        return resp.articulo;
      }),
      catchError(error => of(false))
    );
  }

  crearArticulo(articulo: Articulo) {

    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/api/articulos/`, articulo, {
      headers: {
        'x-token': token
      }
    });
  }
}
