import { BaseException } from './BaseException';

export class ForbiddenException extends BaseException {
  constructor(message: string) {
    super('forbidden', message);
  }
}
