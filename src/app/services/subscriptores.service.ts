import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Subscriptores, Subscriptor } from '../interfaces/subscriptores';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubscriptoresService {

  constructor(private http: HttpClient) { }

  obtenerSubscriptores() {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/subscriptores/`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: Subscriptores) => {
        return resp.subscriptores;
      }),
      catchError(error => of(false))
    );
  }

  actualizarSubscriptor(subscriptor: any, subscriptorId: string) {
    console.log(subscriptorId);
    
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${base_url}/api/subscriptores/${subscriptorId}`, subscriptor, {
      headers: {
        'x-token': token
      }
    });
  }

  verSubscripcion(subscriptorId) {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/api/subscriptores/${subscriptorId}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        return resp.subscriptor;
      }),
      catchError(error => of(false))
    );
  }

  crearSubscripcion(subscriptor: Subscriptor) {

    const token = localStorage.getItem('token') || '';

    return this.http.post(`${base_url}/api/subscriptores/`, subscriptor, {
      headers: {
        'x-token': token
      }
    });
  }
}
