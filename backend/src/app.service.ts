import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos';
import { UpdateUserRequest } from './dtos/update-user.dto';
import { lastValueFrom } from 'rxjs';
import { sendResponse } from './send-response';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject('UserManagement')
    private readonly userManagementClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async nukeCache() {
    await this.cacheManager.reset();
  }

  async createUser(createUserReq: CreateUserDto) {
    const res = await lastValueFrom(
      this.userManagementClient.send({ cmd: 'user_created' }, createUserReq),
    );
    await this.nukeCache();

    return sendResponse(res);
  }

  async searchUsers(
    name: string,
    minAge: number,
    maxAge: number,
    userId: string,
  ) {
    const res = await lastValueFrom(
      this.userManagementClient.send(
        {
          cmd: 'get_users',
        },
        { name, minAge, maxAge, userId },
      ),
    );

    return sendResponse(res);
  }

  async getUser(userId: string) {
    const res = await lastValueFrom(
      this.userManagementClient.send(
        {
          cmd: 'get_user',
        },
        { userId },
      ),
    );

    return sendResponse(res);
  }

  async update(updateUserReq: UpdateUserRequest, userId: string) {
    const res = await lastValueFrom(
      this.userManagementClient.send(
        { cmd: 'update_user' },
        { updateUserReq, userId },
      ),
    );
    await this.nukeCache();

    return sendResponse(res);
  }

  async delete(id: number) {
    const res = await lastValueFrom(
      this.userManagementClient.send({ cmd: 'delete_user' }, id),
    );

    await this.nukeCache();
    return sendResponse(res);
  }

  async blockUsers(ids: string[], userId: string) {
    const res = await lastValueFrom(
      this.userManagementClient.send({ cmd: 'block_users' }, { ids, userId }),
    );
    await this.nukeCache();
    return sendResponse(res);
  }

  async unblockUsers(ids: string[], userId: string) {
    const res = await lastValueFrom(
      this.userManagementClient.send({ cmd: 'unblock_users' }, { ids, userId }),
    );

    await this.nukeCache();
    return sendResponse(res);
  }
}
