import grpc from 'grpc';

export class GRpcBase {
    public load(path: string) {
        return grpc.load(path);
    }

    public createInsecure() {
        return grpc.credentials.createInsecure();
    }
}
