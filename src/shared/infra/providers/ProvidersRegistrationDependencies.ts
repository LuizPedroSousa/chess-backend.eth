import { ChessRegistrationDependencies } from './ChessProvider/ChessRegistrationDependencies';
import { TokensRegistrationDependencies } from './TokensProvider/TokensRegitrationDependencies';

export class ProviderRegistrationDependencies {
  static registry() {
    ChessRegistrationDependencies.registry();
    TokensRegistrationDependencies.registry();
  }
}
