import { Component, OnInit } from '@angular/core';

import { WebsocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public wsService: WebsocketService, public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.sendMessage('Hola desde Angular.');
  }

}
