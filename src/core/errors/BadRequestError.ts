import AppError from './AppError';

class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400, 'Bad Request');
    }
}

export default BadRequestError;
