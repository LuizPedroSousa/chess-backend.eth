import { BaseException } from './BaseException';

export class AlreadyExistsException extends BaseException {
  constructor(message: string) {
    super('bad_request', message);
  }
}
