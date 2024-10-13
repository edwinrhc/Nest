import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnectedClients {
    [id: string]: Socket
}

@Injectable()
export class MessageWsService {

    private connectdClients: ConnectedClients =  {}

    registerClient(client: Socket){
        this.connectdClients[client.id] = client;
    }
    removeClient(clientId: string){
        delete this.connectdClients[clientId];
    }

    getConnectedClients(): number {
        return Object.keys(this.connectdClients).length;
    }

}
