import { Prisma } from '@prisma/client';
import { GenericRepository } from '@shared/application/contracts/persistence/repositories/GenericRepository';
import { BaseEntity } from '@shared/domain/BaseEntity';
import { Either, left, right } from '@shared/domain/Either';
import { BaseModel } from '../models/BaseModel';
import { prisma } from '../orm';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';

interface Mapping<T extends BaseEntity, M extends BaseModel> {
  toPersistence(entity: T): M;
  toDomain(model: M): T;
}

export class PrismaGenericRepository<E extends BaseEntity, M extends BaseModel> implements GenericRepository<E> {
  protected client: any;
  constructor(
    entity_name: Exclude<Lowercase<Prisma.ModelName>>,
    private exception: NotFoundException,
    protected mappings: Mapping<E, M>,
  ) {
    this.client = prisma[entity_name];
  }

  async deleteById(id: string): Promise<void> {
    await this.client.delete({
      where: { id },
    });
  }

  async getAll(): Promise<E[]> {
    const entities: M[] = await this.client.findMany();

    return entities.map(entity => this.mappings.toDomain(entity));
  }

  async getById(id: string): Promise<Either<NotFoundException, E>> {
    const entity: M | undefined = await this.client.findUnique({
      where: {
        id,
      },
    });

    return this.handleEither(entity);
  }

  async create(entity: E): Promise<E> {
    const data = this.mappings.toPersistence(entity);

    const entityPersistence: M = await this.client.create({ data });
    return this.mappings.toDomain(entityPersistence);
  }

  async updateById(id: string, entity: E): Promise<E> {
    const entityPersistence: M = await this.client.update({
      where: { id },
      data: this.mappings.toPersistence(entity),
    });
    return this.mappings.toDomain(entityPersistence);
  }

  protected handleEither(entity?: any): Either<NotFoundException, E> {
    if (!entity) {
      return left(this.exception);
    }

    return right(this.mappings.toDomain(entity));
  }
}
