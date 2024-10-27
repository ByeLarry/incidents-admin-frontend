/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: Socket;
  

  constructor() {
    this.webSocket = io(environment.webSocketConnection, {
      reconnection: false,
    });

    this.connectSocket();
  }

  connectSocket(): void {
    console.log('Web socket connected');
  }

  emit(event: string, data: any): void {
    this.webSocket.emit(event, data);
  }

  onEvent<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.webSocket.on(event, (data: T) => {
        subscriber.next(data);
      });

      return () => this.webSocket.off(event);
    });
  }

  disconnectSocket(): void {
    if (this.webSocket) {
      this.webSocket.disconnect();
      console.log('Web socket disconnected');
    }
  }
}
