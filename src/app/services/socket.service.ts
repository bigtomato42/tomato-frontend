import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Message } from '../shared/model/message';
import { Event } from '../shared/model/event';

import * as socketIo from 'socket.io-client';

// const SERVER_URL = 'http://localhost:8080/';
const SERVER_URL = 'https://tomatosocket.herokuapp.com/';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message, room): void {
        this.socket.emit('message', { room, message });
    }

    public disconnectUser(): void {
        this.socket.emit('disconnected');
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onStatusUpdate() {
        return new Observable<any>(observer => {
            this.socket.on('status', (data) => observer.next(data));
        });
    }

    public onGetUsers() {
        return new Observable<any>(observer => {
            this.socket.on('users', (data) => observer.next(data));
        });
    }

    public onEvent(event: Event, data): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
            this.socket.emit(event + 'ed', data);
        });
    }
}
