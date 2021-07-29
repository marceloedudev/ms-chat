import { IChatRoom } from './MessageRoom';
import IChatRoomRepository from '@/internal/chat-room/repositories/IChatRoomRepository';
import { Model } from 'mongoose';

class ChatRoomRepository implements IChatRoomRepository {
    private db: Model<IChatRoom>;

    constructor(db: any) {
        this.db = db;
    }

    public create(messageData: any) {
        return this.db.create(messageData);
    }

    public find(query: any) {
        return this.db.find(query);
    }
}

export default ChatRoomRepository;
