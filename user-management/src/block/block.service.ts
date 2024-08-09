import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user';
import { sendResponse } from 'src/send-response';

@Injectable()
export class BlockService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async blockUsers(blockUserEvent) {
    const { ids, userId } = blockUserEvent;

    if (!ids || !ids.length) {
      return sendResponse(HttpStatus.NO_CONTENT, {}, 'success');
    }

    const user = (await this.userModel.findById(userId).exec()).toJSON();
    const updatedIds = Array.from(new Set(user.blocked.concat(ids)));

    await this.userModel
      .updateOne({ _id: user._id }, { blocked: updatedIds })
      .exec();
    return sendResponse(HttpStatus.OK, {}, 'success');
  }

  async unblockUsers(unblockUserEvent) {
    const { ids, userId } = unblockUserEvent;

    if (!ids || !ids.length) {
      return sendResponse(HttpStatus.NO_CONTENT, {}, 'success');
    }
    const user = (await this.userModel.findById(userId).exec()).toJSON();
    const unblocked = user.blocked.filter((id) => !ids.includes(id));

    await this.userModel
      .updateOne({ _id: user._id }, { blocked: unblocked })
      .exec();

    return sendResponse(HttpStatus.OK, {}, 'success');
  }
}
