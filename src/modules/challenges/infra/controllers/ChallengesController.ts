import { CreateChallengeUseCase } from '@modules/challenges/core/application/useCases/CreateChallenge/CreateChallengeUseCase';
import { UpdateChallengeWinnerUseCase } from '@modules/challenges/core/application/useCases/UpdateChallenge/UpdateChallengeWinnerUseCase';
import { ExceptionMap } from '@shared/infra/mappings/ExceptionMap';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ChallengesController {
  static async create(req: Request, res: Response): Promise<Response> {
    const challengeOrError = await container.resolve(CreateChallengeUseCase).execute({
      user: req.user,
      ...req.body,
    });

    if (challengeOrError.isLeft()) {
      return ExceptionMap.mapResponse(challengeOrError.value, res);
    }

    return res.status(201).json(challengeOrError.value);
  }

  static async updateWinner(req: Request, res: Response): Promise<Response> {
    const challengeOrError = await container.resolve(UpdateChallengeWinnerUseCase).execute({
      id: req.params.id,
      user: req.user,
      ...req.body,
    });

    if (challengeOrError.isLeft()) {
      return ExceptionMap.mapResponse(challengeOrError.value, res);
    }

    return res.status(200).json(challengeOrError.value);
  }
}
