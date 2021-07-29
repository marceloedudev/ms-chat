import UnauthorizedError from '@/core/errors/UnauthorizedError';
import { inject, singleton } from 'tsyringe';

interface IUserAuthorized {
    query: IUserAuthorizedQuery;
}

interface IUserAuthorizedQuery {
    client_id: string;
    client_secret: string;
    access_token: string;
}

interface IUserAuthorizedResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: 'Bearer';
    user_id: number;
}

export interface IAuthUserMethods {
    UserAuthorized({
        query,
    }: IUserAuthorized): Promise<IUserAuthorizedResponse>;
}

@singleton()
export class GRpcAuthUserMethods implements IAuthUserMethods {
    private proto: any;

    constructor(@inject('proto') proto: any) {
        this.proto = proto;
    }

    public async UserAuthorized({ query }: IUserAuthorized): Promise<any> {
        return new Promise((resolve, reject) => {
            const { client_id, client_secret, access_token } = query;

            this.proto.UserAuthorized(
                {
                    client_id,
                    client_secret,
                    access_token,
                },
                (err: Error, data: any) => {
                    if (err) {
                        return reject(new UnauthorizedError(err?.message));
                    }
                    return resolve(data);
                },
            );
        });
    }
}
