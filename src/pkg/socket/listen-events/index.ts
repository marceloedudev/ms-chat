import { Server, Socket } from 'socket.io';

import { SocketErrorMiddleware } from '../middleware';
import { Token } from '@/core/domain/Token';

export class SocketServerListenEvents {
    private static checkToken: boolean = false;
    private static client: Socket;

    static publish(socket: Socket | Server, key: string, data?: any) {
        socket.emit(key, data);
        return this;
    }

    public static connector(client: Socket) {
        this.client = client;
        return this;
    }

    public static authorize() {
        this.checkToken = true;
        return this;
    }

    public static subscribe(key: string, fn: Function) {
        this.client.on(key, async ({ token, data }, callback: Function) => {
            try {
                let userData = null;

                if (this.checkToken) {
                    const { accessToken, refreshToken } = token;

                    Token.isValid(accessToken);

                    userData = await SocketErrorMiddleware.handleAuthorize({
                        accessToken,
                        refreshToken,
                    });
                }

                const response = await fn({ token, data, userData });
                callback({ data: response, ...userData });
            } catch (error) {
                callback(SocketErrorMiddleware.errorResponse(error));

                this.client.emit('my error', {
                    message: error.message,
                    name: error.name,
                });
            }
        });
    }
}
