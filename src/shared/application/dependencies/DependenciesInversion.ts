import { PersistenceDependencies } from './PersistenceDependencies';
import { ProviderDependencies } from './ProviderDependencies';

export const DependenciesInversion = {
  ...PersistenceDependencies,
  ...ProviderDependencies,
};
