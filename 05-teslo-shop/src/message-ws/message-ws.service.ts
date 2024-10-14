import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}

@Injectable()
export class MessageWsService {

    private connectedClients: ConnectedClients =  {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    async registerClient(client: Socket, userId: string) {
        const user = await this.userRepository.findOneBy({id: userId});
        // console.log(user);
        if( !user) throw new Error('User not found');
        if( !user.isActive) throw new Error('User not active');

        this.connectedClients[client.id] = {
            socket: client,
            user: user
        };
    }

    removeClient(clientId: string){
        delete this.connectedClients[clientId];
    }

    getConnectedClients(): string[] {
        // console.log(this.connectedClients);
        return Object.keys(this.connectedClients);
    }

    getUserFullName(socketId: string){
        return this.connectedClients[socketId].user.fullName;
    }

}
