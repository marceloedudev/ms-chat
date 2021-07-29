import AppError from '@/core/errors/AppError';
import { GRpcAuthUserMethods } from '@/internal/chat-room/infra/grpc/auth-user';
import { container } from 'tsyringe';

export interface ISocketRequest {
    token: {
        accessToken: string;
        refreshToken: string;
    };
    data: null;
    userData?: any;
}

export interface IHandleAuthorize {
    accessToken: string;
    refreshToken: string;
}

export class SocketErrorMiddleware {
    public static errorResponse(err: Error | AppError) {
        if (err instanceof AppError) {
            return {
                error: err,
            };
        }

        if (err.message) {
            return {
                error: {
                    message: err.message,
                    status: 400,
                    error: 'Bad Request',
                    timestamp: new Date(),
                },
            };
        }

        return {
            error: {
                message: 'Internal server error',
                status: 500,
                error: 'Internal Server Error',
                timestamp: new Date(),
            },
        };
    }

    public static async handleAuthorize({
        accessToken,
        refreshToken,
    }: IHandleAuthorize) {
        try {
            const methods = container.resolve(GRpcAuthUserMethods);

            const data = await methods.UserAuthorized({
                query: {
                    client_id: `${process.env.AUTH_CLIENT_ID}`,
                    client_secret: `${process.env.AUTH_CLIENT_SECRET}`,
                    access_token: accessToken,
                },
            });

            return Promise.resolve({
                userData: data,
                newToken: null,
            });
        } catch (err) {
            // try refresh token
            if (refreshToken?.length) {
                return Promise.resolve({
                    newToken: {
                        accessToken: 'a',
                        refreshToken: 'b',
                    },
                });
            }
            return Promise.reject(err);
        }
    }
}
