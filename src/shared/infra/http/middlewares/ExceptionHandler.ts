import { BaseException } from '@shared/domain/exceptions/BaseException';
import { ExceptionMap } from '@shared/infra/mappings/ExceptionMap';
import { NextFunction, Request, Response } from 'express';

export class ExceptionHandler {
  public static handle(exception: BaseException, request: Request, response: Response, _: NextFunction): Response {
    if (!(exception instanceof BaseException) || exception?.status === 'internal') {
      console.error(exception);
    }

    return ExceptionMap.mapResponse(exception, response);
  }
}
