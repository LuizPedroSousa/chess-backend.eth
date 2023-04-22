import { BaseException } from '@shared/domain/exceptions/BaseException';

export class CorsOriginException extends BaseException {
  constructor(origin: string) {
    super('internal', `A política CORS para este site não permite acesso da Origem ${origin}.`);

    this.name = 'CorsOriginException';
  }
}
