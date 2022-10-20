import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  mensajesSbuscription: Subscription;

  mensajes: any[] = [];

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.mensajesSbuscription = this.chatService.getMessages().subscribe(msg => {
      this.mensajes.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.mensajesSbuscription.unsubscribe();
  }

  enviar() {
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }
}
