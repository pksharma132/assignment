import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { UsersModule } from 'src/users/users.module';
import { BlockService } from './block.service';

@Module({
  controllers: [BlockController],
  imports: [UsersModule],
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
