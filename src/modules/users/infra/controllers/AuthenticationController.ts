import { AuthenticateUserUseCase } from '@modules/users/core/application/useCases/authenticateUser/AuthenticateUserUseCase';
import { ExceptionMap } from '@shared/infra/mappings/ExceptionMap';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticationController {
  static async authenticate(req: Request, res: Response) {
    const userExists = await container.resolve(AuthenticateUserUseCase).execute({
      ...req.body,
    });

    if (userExists.isLeft()) {
      return ExceptionMap.mapResponse(userExists.value, res);
    }

    return res.status(200).json({
      user: {
        id: userExists.value.user.id,
      },
      access_token: userExists.value.access_token,
    });
  }
}
