import { ChallengesRepository } from '@modules/challenges/core/application/contracts/repositories/ChallengesRepository';
import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { mapper } from '@shared/infra/mappings/mapper';
import { PrismaGenericRepository } from '@shared/infra/persistence/repositories/PrismaGenericRepository';
import { ChallengeModel } from '../models/ChallengeModel';
import { Either } from '@shared/domain/Either';
import { prisma } from '@shared/infra/persistence/orm';

export class PrismaChallengeRepositoenry
  extends PrismaGenericRepository<Challenge, ChallengeModel>
  implements ChallengesRepository
{
  constructor() {
    super('challenge', new NotFoundException('Challenge not found'), {
      toDomain: model => mapper.map(model, ChallengeModel, Challenge),
      toPersistence: entity => mapper.map(entity, Challenge, ChallengeModel),
    });
  }

  async getById(id: string): Promise<Either<NotFoundException, Challenge>> {
    const challengeExists = await prisma.challenge.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return this.handleEither(challengeExists);
  }

  async getByStatus(status: string): Promise<Either<NotFoundException, Challenge>> {
    const challengeExists = await prisma.challenge.findFirst({
      where: {
        status,
      },
    });

    return this.handleEither(challengeExists);
  }

  async create(entity: Challenge): Promise<Challenge> {
    const { user, ...data } = this.mappings.toPersistence(entity);

    const challenge = await prisma.challenge.create({
      data: {
        ...data,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return challenge as any;
  }

  async updateById(id: string, entity: Challenge): Promise<Challenge> {
    const { user, ...data } = this.mappings.toPersistence(entity);

    const challenge = await prisma.challenge.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });

    return challenge as any;
  }
}
