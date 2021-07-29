import {
    ISocket,
    ISocketRequest,
    SocketServer,
    SocketServerListenEvents,
} from '@/pkg/socket';

import JoinRoomController from '../controllers/JoinRoomController';

export type IMakeChatRoomEventsSocket = {
    server: SocketServer;
    client: ISocket;
};

export const makeChatRoomEventsSocket = ({
    server,
    client,
}: IMakeChatRoomEventsSocket) => {
    SocketServerListenEvents.connector(client)
        .authorize()
        .subscribe('join-room', ({ token, data, userData }: ISocketRequest) => {
            return new JoinRoomController(server).execute({
                token,
                data,
                userData,
            });
        });
};
