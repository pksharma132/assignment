import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserRequest } from './dtos/update-user.dto';
import { AuthGuard } from './auth.guard';
import { CacheTTL } from '@nestjs/cache-manager';

@CacheTTL(900000)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  async createUser(@Body() createUserReq: CreateUserDto) {
    return this.appService.createUser(createUserReq);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getUser(@Req() req: Request) {
    return this.appService.getUser(req['id']);
  }

  @UseGuards(AuthGuard)
  @Get('users')
  searchUsers(
    @Req() req: Request,
    @Query('username') username: string | undefined,
    @Query('min_age') minAge: number | undefined,
    @Query('max_age') maxAge: number | undefined,
  ) {
    return this.appService.searchUsers(username, minAge, maxAge, req['id']);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Put('users')
  async updateUser(
    @Body() updateUserReq: UpdateUserRequest,
    @Req() req: Request,
  ) {
    return this.appService.update(updateUserReq, req['id']);
  }

  @UseGuards(AuthGuard)
  @Delete('users/')
  async deleteUser(@Req() req: Request) {
    return this.appService.delete(req['id']);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('users/block')
  async blockUser(@Body() userIds: string[], @Request() req: Request) {
    return this.appService.blockUsers(userIds, req['id']);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('users/unblock')
  unblockUser(@Body() userIds: string[], @Request() req: Request) {
    return this.appService.unblockUsers(userIds, req['id']);
  }
}
