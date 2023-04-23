import { AutoMap } from '@automapper/classes';
import { User as PrismaUser } from '@prisma/client';
import { BaseModel } from '@shared/infra/persistence/models/BaseModel';

export class UserModel extends BaseModel implements PrismaUser {
  @AutoMap()
  name: string;
  @AutoMap()
  username: string;
  @AutoMap()
  email: string;
}
