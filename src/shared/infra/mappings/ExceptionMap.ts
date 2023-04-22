import { BaseException, StatusException } from '@shared/domain/exceptions/BaseException';
import { Response } from 'express';

export class ExceptionMap {
  public static mapResponse(exception: BaseException, res: Response): Response {
    const statusCode: { [key in StatusException]: number } = {
      bad_request: 400,
      internal: 500,
      not_found: 404,
    };

    return res.status(statusCode[exception.status] || 500).json({
      message: exception.message,
    });
  }
}
