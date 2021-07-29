import AppError from './AppError';

class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401, 'Unauthorized');
    }
}

export default UnauthorizedError;
