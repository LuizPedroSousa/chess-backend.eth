import { BaseException } from './BaseException';

export class AlreadyExistsException extends BaseException {
  constructor(name: string) {
    super('bad_request', `${name} ja existe`);
  }
}
