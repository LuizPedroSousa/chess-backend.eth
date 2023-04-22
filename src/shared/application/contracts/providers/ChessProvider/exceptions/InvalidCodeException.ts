import { BaseException } from '@shared/domain/exceptions/BaseException';

export class InvalidCodeException extends BaseException {
  constructor() {
    super('bad_request', "The code provided isn't valid");
  }
}
