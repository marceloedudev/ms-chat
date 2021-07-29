import {
    ISocketRequest,
    SocketServer,
    SocketServerListenEvents,
} from '@/pkg/socket';

import { SendRoomUsecase } from '@/internal/chat-room/usecases/SendRoomUsecase';
import { container } from 'tsyringe';

export default class JoinRoomController {
    constructor(private readonly server: SocketServer) {}

    public async execute(request: ISocketRequest) {
        const { accessToken, refreshToken } = request.token;

        const sendRoom = container.resolve(SendRoomUsecase);

        await sendRoom.execute({
            data: {
                ok: 'asd',
            },
        });

        SocketServerListenEvents.publish(this.server.getServer(), 'ok');

        return {
            ok: true,
        };
    }
}
