import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BlockService } from './block.service';

@Controller()
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @MessagePattern({ cmd: 'block_users' })
  blockUser(blockUsersEvent) {
    return this.blockService.blockUsers(blockUsersEvent);
  }

  @MessagePattern({ cmd: 'unblock_users' })
  unblockUser(unblockUsersEvent) {
    return this.blockService.unblockUsers(unblockUsersEvent);
  }
}
