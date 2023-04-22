import { BaseException } from '@shared/domain/exceptions/BaseException';

export class MissingJWTException extends BaseException {
  constructor() {
    super('bad_request', 'JWT is missing');
  }
}
