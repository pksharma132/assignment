import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
// import { APP_FILTER } from '@nestjs/core';
// import { ExceptionFilter } from 'src/rpc-exception.filter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 8640000,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
