import { BaseEntity } from '@shared/domain/BaseEntity';
import { Either } from '@shared/domain/Either';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';

type GetEntityResponse<E extends BaseEntity> = Promise<Either<NotFoundException, E>>;

export interface GenericRepository<E extends BaseEntity> {
  deleteById(id: string): Promise<void>;
  getAll(): Promise<E[]>;
  getById(id: string): GetEntityResponse<E>;
  create(entity: E): Promise<E>;
  updateById(id: string, entity: E): Promise<E>;
}
