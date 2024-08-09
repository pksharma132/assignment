import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user';
import { UpdateUserEvent } from 'src/update-user-event';
import { CreateUserRequest, Response } from '../../types';
import { sendResponse } from 'src/send-response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserEvent: CreateUserRequest): Promise<Response> {
    try {
      const user: CreateUserRequest = {
        ...createUserEvent,
        birthdate: new Date(createUserEvent.birthdate),
      };
      const createdUser = (
        await (await this.userModel.create(user)).save()
      ).toJSON();
      const jwt = await this.jwtService.signAsync({ id: createdUser._id });
      return sendResponse(
        HttpStatus.CREATED,
        { user: createdUser, authtoken: jwt },
        'success',
      );
    } catch (e) {
      console.log('exception!', e);
      return sendResponse();
    }
  }

  getBirthYearFromAge(age: number, currentDate = new Date()) {
    const currentYear = currentDate.getFullYear();

    let birthYear = currentYear - age;

    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const birthMonth = 0;
    const birthDay = 1;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      birthYear -= 1;
    }
    return new Date(birthYear, birthMonth, birthDay);
  }

  async searchUsers(
    name: string,
    minAge: number,
    maxAge: number,
    userId: string,
  ): Promise<Response> {
    try {
      const query: any = {};

      const user = (await this.userModel.findById(userId).exec()).toJSON();

      const blocked = user.blocked;

      if (name) {
        query.username = new RegExp(name || '', 'i');
      }

      query._id = { $nin: blocked };

      if (minAge && maxAge) {
        query.birthdate = {
          $lte: this.getBirthYearFromAge(minAge),
          $gte: this.getBirthYearFromAge(maxAge),
        };
      } else if (minAge) {
        query.birthdate = { $lte: this.getBirthYearFromAge(minAge) };
      } else if (maxAge) {
        query.birthdate = { $gte: this.getBirthYearFromAge(maxAge) };
      }

      return sendResponse(
        HttpStatus.OK,
        await this.userModel.find(query).exec(),
        'success',
      );
    } catch (e) {
      console.log('failed', e);
      return sendResponse();
    }
  }

  async updateUser(
    updateUserEvent: UpdateUserEvent['updateUserReq'],
    userId: string,
  ) {
    try {
      const found = await this.userModel.findOne({ _id: userId }).exec();
      if (!found) {
        return sendResponse(HttpStatus.NOT_FOUND, 'user not found', 'failure');
      }

      const response = await this.userModel
        .findByIdAndUpdate(
          userId,
          { ...updateUserEvent, id: undefined },
          { new: true, upsert: false },
        )
        .exec();

      return sendResponse(HttpStatus.OK, response, 'success');
    } catch (e) {
      return sendResponse();
    }
  }

  async getUser(userId: string): Promise<Response> {
    try {
      const user = (await this.userModel.findById(userId).exec()).toJSON();

      return sendResponse(HttpStatus.OK, user, 'success');
    } catch (e) {
      console.log('failed', e);
      return sendResponse();
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await this.userModel.findByIdAndDelete(id);

      if (result) {
        return sendResponse(HttpStatus.OK, result, 'success');
      }

      return sendResponse(
        HttpStatus.BAD_REQUEST,
        'User not found with the given id',
        'failure',
      );
    } catch (err) {
      console.error('Error deleting user:', err);
      return sendResponse();
    }
  }
}
