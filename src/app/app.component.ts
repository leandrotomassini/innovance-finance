import { Component } from '@angular/core';

import { WebsocketService } from './services/websocket.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public wsService: WebsocketService) { }
}
