import {
    GRpcAuthUser,
    GRpcAuthUserMethods,
    IAuthUserMethods,
} from '@/internal/chat-room/infra/grpc/auth-user';
import { container, delay } from 'tsyringe';

import ChatRoomRepository from '@/internal/chat-room/repositories/ChatRoomRepository';
import IChatRoomRepository from '@/internal/chat-room/repositories/IChatRoomRepository';

container.registerSingleton<IChatRoomRepository>(
    'ChatRoomRepository',
    delay(() => ChatRoomRepository),
);

const client = GRpcAuthUser.load().connect();

container.register('proto', { useValue: client });

container.registerSingleton<IAuthUserMethods>(
    'GRpcAuthUserMethods',
    delay(() => GRpcAuthUserMethods),
);
