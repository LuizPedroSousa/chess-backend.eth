import { BaseException } from './BaseException';

export class InvalidException extends BaseException {
  constructor(message: string) {
    super('bad_request', message);
  }
}
