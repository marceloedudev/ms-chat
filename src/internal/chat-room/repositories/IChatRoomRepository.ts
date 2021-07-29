import { IChatRoom } from './MessageRoom';
import { Query } from 'mongoose';

export default interface IChatRoomRepository {
    find(query: any): Query<IChatRoom[], IChatRoom>;
    create(data: any): Promise<IChatRoom>;
}
