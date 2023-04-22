import { ChessProvider } from '@shared/application/contracts/providers/ChessProvider/ChessProvider';
import { ProviderDependencies } from '@shared/application/dependencies/ProviderDependencies';
import { container } from 'tsyringe';
import { LichessChessProvider } from './LichessChessProvider/LichessChessProvider';
import { UserMap } from './LichessChessProvider/mappings/UserMap';

export class ChessRegistrationDependencies {
  static registry() {
    UserMap.registry();
    container.registerSingleton<ChessProvider>(ProviderDependencies.ChessProvider, LichessChessProvider);
  }
}
