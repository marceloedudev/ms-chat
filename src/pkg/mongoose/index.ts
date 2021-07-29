import mongoose from 'mongoose';

type IMongooseConfig = {
    uri: string;
    options: mongoose.ConnectOptions;
};

export class MongooseBase {
    private configMongoose: IMongooseConfig;

    constructor(config: IMongooseConfig) {
        this.configMongoose = config;
    }

    static config() {
        const config: IMongooseConfig = {
            uri: `mongodb://${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}`,
            options: {
                useNewUrlParser: true,
                useFindAndModify: false,
            },
        };

        mongoose.connection.on('open', () => {
            console.log('Successfully connected to database.');
        });

        mongoose.connection.on('error', () => {
            throw new Error('Could not connect to MongoDB.');
        });

        return new MongooseBase(config);
    }

    connect() {
        return mongoose.connect(
            this.configMongoose.uri,
            this.configMongoose.options,
        );
    }
}
