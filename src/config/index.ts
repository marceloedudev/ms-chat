import dotenv from 'dotenv';
import path from 'path';

const currentEnv = process.env.NODE_ENV
    ? process.env.NODE_ENV.trim().toLowerCase()
    : 'development';

const getPathFileEnv = () => {
    let file = '.env.development';

    if (currentEnv === 'production') {
        file = '.env.production';
    }

    return path.resolve(__dirname, '..', '..', file);
};

dotenv.config({
    path: getPathFileEnv(),
});
