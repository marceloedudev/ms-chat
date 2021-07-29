import * as protoLoader from '@grpc/proto-loader';

import { GRpcBase } from '@/pkg/grpc';
import grpc from 'grpc';
import path from 'path';

export class GRpcAuthUser extends GRpcBase {
    private readonly proto: any;

    constructor(proto: string) {
        super();
        const packageDefinition = protoLoader.loadSync(proto, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        this.proto = grpc.loadPackageDefinition(packageDefinition);
    }

    public static load() {
        const pathProto = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'infra',
            'grpc',
            'proto',
            'user.proto',
        );

        return new GRpcAuthUser(pathProto);
    }

    public connect() {
        return new this.proto.ms.auth.AuthUserService(
            `${process.env.AUTH_GRPC_HOSTNAME}:${process.env.AUTH_GRPC_PORT}`,
            this.createInsecure(),
        );
    }
}
