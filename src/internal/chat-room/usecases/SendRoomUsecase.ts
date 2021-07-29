import { injectable, inject } from 'tsyringe';

import IChatRoomRepository from '../repositories/IChatRoomRepository';

export interface ISendRoomRequestUseCase {
    data?: any;
}

@injectable()
export class SendRoomUsecase {
    constructor(
        @inject('ChatRoomRepository')
        private chatRoomRepository: IChatRoomRepository,
    ) {}

    public async execute({ data }: ISendRoomRequestUseCase): Promise<any> {
        return {
            service: true,
        };
    }
}
