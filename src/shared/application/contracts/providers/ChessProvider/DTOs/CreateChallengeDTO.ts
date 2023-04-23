import { Token } from "@modules/tokens/core/domain/Token";
import { User } from "@modules/users/core/domain/User";


export interface CreateChallengeDTO {
    token: Token;
    user: User;
  }