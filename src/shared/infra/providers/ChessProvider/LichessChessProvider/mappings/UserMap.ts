import { createMap } from '@automapper/core';
import { User } from '@modules/users/core/domain/User';
import { mapper } from '@shared/infra/mappings/mapper';
import { UserModel } from '../models/UserModel';

export class UserMap {
  static registry() {
    createMap(mapper, UserModel, User);
  }
}
