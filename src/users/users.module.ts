import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { CreateUsersProvider } from './providers/create-users.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FindAllUsersProvider } from './providers/find-all-users.provider';
import { DeleteUserByIdProvider } from './providers/delete-user-by-id.provider';
import { ReactivateUserByIdProvider } from './providers/reactivate-user-by-id.provider';
import { UpdateUserByIdProvider } from './providers/update-user-by-id.provider';
import { CreateManyUsersProvider } from './providers/create-many-users.provider';
import { Order } from 'src/orders/order.entity';
import { Review } from 'src/reviews/review.entity';

@Module({
  // Controllers handle incoming requests, and here we register the UsersController to handle routes for user-related actions
  controllers: [UsersController],
  
  providers: [
    // The services and providers used for managing users are registered here.
    UsersService, 
    FindOneByEmailProvider, // Provider to find a user by email
    CreateUsersProvider, // Provider to handle user creation
    FindOneByIdProvider, // Provider to find a user by ID
    FindAllUsersProvider, // Provider to find all users
    DeleteUserByIdProvider, // Provider to delete a user by ID
    ReactivateUserByIdProvider, // Provider to reactivate a user by ID
    UpdateUserByIdProvider, // Provider to update a user by ID
    CreateManyUsersProvider, // Provider to handle creating multiple users at once
  ],
  
  // Exports the UsersService so it can be used in other modules (e.g., for injecting into other services)
  exports: [UsersService],
  
  imports: [
    // TypeOrmModule is used to work with the database (TypeORM configuration). 
    // We're registering the User entity, along with Order and Review entities to use them in the current module.
    TypeOrmModule.forFeature([User, Order, Review]),

    // forwardRef() allows the circular dependency between the UsersModule and AuthModule to be resolved.
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}
