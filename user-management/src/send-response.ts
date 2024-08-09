import { HttpStatus } from '@nestjs/common';
import { Response } from 'types';

export function sendResponse(
  statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  body: unknown = 'Internal Server Error',
  status: 'success' | 'failure' = 'failure',
): Response {
  return {
    status,
    statusCode,
    body,
  };
}
