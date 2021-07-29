import 'reflect-metadata';
import '@/config';
import '@/core/container';

import { ISocket, SocketServer } from '@/pkg/socket';

import { MongooseBase } from '@/pkg/mongoose';
import express from 'express';
import http from 'http';
import { makeChatRoomEventsSocket } from '@/internal/chat-room/infra/socket/events';

const port = 6000;
const app = express();
const httpServer = new http.Server(app);

MongooseBase.config()
    .connect()
    .then(() => {
        const server = new SocketServer(httpServer);

        server.connection((client: ISocket) => {
            makeChatRoomEventsSocket({
                server,
                client,
            });
        });

        httpServer.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });
