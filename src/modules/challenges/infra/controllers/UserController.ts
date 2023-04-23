import { ShowUserUseCase } from '@modules/users/core/application/useCases/showUser/ShowUserUseCase';
import { ExceptionMap } from '@shared/infra/mappings/ExceptionMap';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserController {
  static async show(req: Request, res: Response): Promise<Response> {
    const userOrError = await container.resolve(ShowUserUseCase).execute({
      id: req.params.id,
    });

    if (userOrError.isLeft()) {
      return ExceptionMap.mapResponse(userOrError.value, res);
    }

    return res.status(200).json(userOrError.value);
  }
}
