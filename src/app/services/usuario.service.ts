import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  loginGoogle(id_token: string) {
    return this.http.post(`${base_url}/auth/google`, { id_token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }
}
