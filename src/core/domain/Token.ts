import BadRequestError from '@/core/errors/BadRequestError';

export class Token {
    public static isValid(token: string) {
        if (!token?.length) {
            throw new BadRequestError('Invalid token');
        }
    }
}
