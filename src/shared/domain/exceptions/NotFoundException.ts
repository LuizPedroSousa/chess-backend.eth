import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super('not_found', message);
  }
}
