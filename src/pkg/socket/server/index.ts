import { Server, Socket } from 'socket.io';

export interface ISocket extends Socket {}

export class SocketServer {
    private io: Server;

    constructor(readonly httpServer: any) {
        this.io = new Server(httpServer);
    }

    connection(callback: Function) {
        this.io.on('connection', (socket: Socket) => {
            callback(socket);
        });
        return this;
    }

    getServer() {
        return this.io;
    }

    listen(port: number) {
        this.io.listen(port);
    }
}
