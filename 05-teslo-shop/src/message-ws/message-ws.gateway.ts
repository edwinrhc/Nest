import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {MessageWsService} from './message-ws.service';
import {Server, Socket} from 'socket.io';
import {NewMessageDto} from './dtos/new-message.dto';
import {JwtService} from '@nestjs/jwt';
import {JwtPayload} from '../auth/interfaces';

@WebSocketGateway({cors: true})
export class MessageWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    constructor(
        private readonly messageWsService: MessageWsService,
        private readonly jwtService: JwtService
    ) {
    }

    async handleConnection(client: Socket) {
        // console.log('Cliente conectado', client.id);
        // console.log(client)
        const token = client.handshake.headers.authentication as string;
        let payload: JwtPayload;
        try {
            payload = this.jwtService.verify(token);
            await this.messageWsService.registerClient(client, payload.id);
        } catch (error) {
            client.disconnect();
            return;
        }
        // console.log({payload});
        // console.log({conectados: this.messageWsService.getConnectedClients()});
        this.wss.emit('clients-updated', this.messageWsService.getConnectedClients());

    }

    handleDisconnect(client: Socket) {


        // console.log('Cliente desconectado',client.id);
        this.messageWsService.removeClient(client.id);
        // console.log({conectados: this.messageWsService.getConnectedClients()});
        this.wss.emit('clients-updated', this.messageWsService.getConnectedClients());
    }

    @SubscribeMessage('message-from-client')
    //onMessaggeFromClient
    handleMessageFromClient(client: Socket, payload: NewMessageDto) {

        // message-from-server
        //! Emite únicamente al cliente.
        // client.emit('message-from-server',{
        //   fullName: 'Soy yo',
        //   message: payload.message || 'no-messsage!!'
        // });

        //! Emitir a todos MENOS, al cliente inicial
        // client.broadcast.emit('message-from-server',{
        //   fullName: 'Soy yo',
        //   message: payload.message || 'no-messsage!!'
        // });

        // Emitir todos los clientes
        this.wss.emit('message-from-server', {
            fullName: this.messageWsService.getUserFullName(client.id),
            message: payload.message || 'no-message!!'
        });

    }
}
