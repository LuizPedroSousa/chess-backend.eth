import { TokensProvider } from '@shared/application/contracts/providers/TokensProvider/TokensProvider';
import { ProviderDependencies } from '@shared/application/dependencies/ProviderDependencies';
import { container } from 'tsyringe';
import { JWTTokensProvider } from './JWTTokensProvider/JWTTokenProvider';

export class TokensRegistrationDependencies {
  static registry() {
    container.registerSingleton<TokensProvider>(ProviderDependencies.TokensProvider, JWTTokensProvider);
  }
}
