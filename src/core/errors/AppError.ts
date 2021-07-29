export default class AppError extends Error {
    message: string;

    status: number;

    error?: string;

    timestamp?: Date;

    constructor(
        message: string,
        status: number,
        error: string,
        timestamp: Date = new Date(),
    ) {
        super();
        this.message = message;
        this.status = status;
        this.error = error;
        this.timestamp = timestamp;
    }
}
