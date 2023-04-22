import { AutoMap } from '@automapper/classes';
import { v4 as uuid } from 'uuid';

export abstract class BaseEntity {
  @AutoMap()
  public id: string;
  @AutoMap()
  public created_at: Date;
  @AutoMap()
  public updated_at: Date;

  constructor(id?: string) {
    this.id = id || uuid();

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}
