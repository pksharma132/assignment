import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UpdateUserEvent } from 'src/update-user-event';
import { CreateUserRequest, SearchUserEvent } from 'types';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'user_created' })
  createUser(createUserReq: CreateUserRequest) {
    return this.userService.createUser(createUserReq);
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(searchUserEvent: SearchUserEvent) {
    const { userId } = searchUserEvent;
    return this.userService.getUser(userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  searchUsers(searchUserEvent: SearchUserEvent) {
    const { name, maxAge, minAge, userId } = searchUserEvent;
    return this.userService.searchUsers(name, +minAge, +maxAge, userId);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateUser(updateUserEvent: UpdateUserEvent) {
    return this.userService.updateUser(
      updateUserEvent.updateUserReq,
      updateUserEvent.userId,
    );
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteUser(id: number) {
    return this.userService.deleteUser(id);
  }
}
