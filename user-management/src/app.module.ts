import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BlockController } from './block/block.controller';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    BlockModule,
  ],
  controllers: [AppController, BlockController],
  providers: [AppService],
})
export class AppModule {}
