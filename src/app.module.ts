import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseInterceptor } from './common/interceptors/data-response.interceptor';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';

// Environment variable to check the current NODE_ENV (development, production, etc.)
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    // Importing modules for the core features of the application
    ProductsModule, 
    CategoriesModule, 
    OrdersModule, 
    UsersModule, 
    ReviewsModule, 
    AuthModule,
    // ConfigModule - Handles configuration management globally
    ConfigModule.forRoot({
      isGlobal: true, // Makes configuration available globally across the app
      envFilePath: !ENV ? '.env' : `.env.${ENV}`, // Loads different env files based on the current NODE_ENV
      load: [appConfig, databaseConfig], // Loads custom configuration from files
      validationSchema: environmentValidation, // Validates environment variables using a schema
    }),

    // TypeOrmModule - For database connection setup using TypeORM (PostgreSQL in this case)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Imports the ConfigModule to access config values
      inject: [ConfigService], // Injecting ConfigService to get values from the configuration
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Specifies PostgreSQL as the database type
        autoLoadEntities: configService.get('databaseConfig.autoloadEntities'), // Dynamically loads entities
        synchronize: configService.get('databaseConfig.synchronize'), // Database sync option (e.g., auto-creating tables)
        host: configService.get('databaseConfig.host'),
        port: +configService.get('databaseConfig.port'),
        username: configService.get('databaseConfig.username'),
        password: configService.get('databaseConfig.password'),
        database: configService.get('databaseConfig.database_name'),
        // logging: true, // Option to enable SQL query logging
      }),
    }),

    // ConfigModule.forFeature - Loads configuration specific to JWT settings
    ConfigModule.forFeature(jwtConfig),

    // JwtModule - Used for handling JWT tokens, with async configuration
    JwtModule.registerAsync(jwtConfig.asProvider()),

    // PaginationModule - Handles pagination functionality across the app
    PaginationModule,
  ],
  controllers: [AppController], // Registers the main controller for routing requests
  providers: [
    AppService,
    {
      // Applying a global guard to secure the app (AuthenticationGuard for all routes)
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      // Applying an interceptor to format the response data consistently
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard, // Provides access token guard for route-level protection
  ],
})
export class AppModule {}
