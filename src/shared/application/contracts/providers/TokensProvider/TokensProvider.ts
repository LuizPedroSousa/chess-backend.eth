import { Token } from '@modules/tokens/core/domain/Token';
import { GenerateTokenDTO } from './DTOs/GenerateTokenDTO';
import { Either } from '@shared/domain/Either';
import { InvalidTokenException } from '@modules/tokens/core/domain/exceptions/InvalidTokenException';

export interface TokensProvider {
  generate(data: GenerateTokenDTO): Promise<string>;
  decode(token: string): Promise<Either<InvalidTokenException, Token>>;
}
