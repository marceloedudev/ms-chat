import AppError from './AppError';

class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500, 'Internal Server Error');
    }
}

export default InternalServerError;
