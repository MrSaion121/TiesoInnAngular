import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  socket!: Socket;
  message: string = '';
  messages: ChatMessage[] = [];
  socketId: string = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  ngOnInit() {
  this.socket = io(environment.socketUrl);

  this.socket.on('connect', () => {
    this.socketId = this.socket.id as string;
    console.log('Socket conectado con ID:', this.socketId);
  });

  // Recibe historial
  this.socket.on('chatHistory', (history: ChatMessage[]) => {
    console.log('Historial recibido:', history);
    this.messages = history;
    setTimeout(() => this.scrollToBottom(), 100);
  });

  this.socket.on('chatMessage', (msg: ChatMessage) => {
    console.log('Mensaje recibido del servidor:', msg);
    this.messages.push(msg);
    setTimeout(() => this.scrollToBottom(), 100);
  });
}


  sendMessage(): void {
    const trimmed = this.message.trim();
    if (!trimmed) return;

    const chatMsg: ChatMessage = {
      text: trimmed,
      senderId: this.socketId,
      timestamp: new Date().toISOString()
    };

    this.socket.emit('chatMessage', chatMsg);
    this.message = '';
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}


interface ChatMessage {
  text: string;
  senderId: string;
  timestamp: string;
}
