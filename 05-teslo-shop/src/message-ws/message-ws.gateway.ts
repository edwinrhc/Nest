import { WebSocketGateway } from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';

@WebSocketGateway({cors: true})
export class MessageWsGateway {
  constructor(private readonly messageWsService: MessageWsService) {}
}
