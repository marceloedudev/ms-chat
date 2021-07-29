import { Document, Model, Schema, model } from 'mongoose';

export interface IChatRoom extends Document {
    content: string;
    email: string;
    user_email: string;
    user_id: number;
}

const messageSchema: Schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        user_name: {
            type: String,
            required: true,
            unique: true,
        },
        user_id: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    },
);

const MessageRoom: Model<IChatRoom> = model('MessageRoom', messageSchema);

export default MessageRoom;
