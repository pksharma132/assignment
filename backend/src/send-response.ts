import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from '../types';

export function sendResponse(response: Response) {
  if (response.status === 'success') {
    return response.body;
  } else {
    if (response.statusCode === HttpStatus.NOT_FOUND) {
      throw new NotFoundException(response.body);
    }
    if (response.statusCode === HttpStatus.BAD_REQUEST) {
      throw new BadRequestException(response.body);
    }
  }

  throw new InternalServerErrorException('Internal Server Error');
}
