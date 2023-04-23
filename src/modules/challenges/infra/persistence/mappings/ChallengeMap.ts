import { createMap } from '@automapper/core';
import { Challenge } from '@modules/challenges/core/domain/Challenge';
import { mapper } from '@shared/infra/mappings/mapper';
import { ChallengeModel } from '../models/ChallengeModel';

export class ChallengeMap {
  static registry() {
    {
      createMap(mapper, ChallengeModel, Challenge);
      createMap(mapper, Challenge, ChallengeModel);
    }
  }
}
