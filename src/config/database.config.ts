import { registerAs } from "@nestjs/config";

interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database_name: string;
    synchronize: boolean;
    autoloadEntities: boolean;
}

const toBoolean = (value: string | undefined): boolean => {
    return value === 'true';
}

export default registerAs<DatabaseConfig>(
    'databaseConfig', () => ({
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database_name: process.env.DATABASE_NAME,
        synchronize: toBoolean(process.env.DATABASE_SYNC),
        autoloadEntities: toBoolean(process.env.DATABASE_AUTOLOAD),
}));
