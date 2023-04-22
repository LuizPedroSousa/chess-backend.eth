import { shallowEqual } from 'shallow-equal-object';

export abstract class BaseValueObject {
  public equals(other: BaseValueObject): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    return shallowEqual(this, other);
  }
}
