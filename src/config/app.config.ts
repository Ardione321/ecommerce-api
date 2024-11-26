import { registerAs } from "@nestjs/config";

interface AppConfig {
    environment: string;
    appName: string;
    apiVersion: string;
}

export default registerAs<AppConfig>(
    'appConfig', () => ({
        environment: process.env.NODE_ENV || 'production',
        appName: process.env.APP_NAME || 'ecommerce-api',
        apiVersion: process.env.API_VERSION || '1.0.0',
    }))
