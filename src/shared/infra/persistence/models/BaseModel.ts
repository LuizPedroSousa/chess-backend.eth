import { AutoMap } from '@automapper/classes';

export class BaseModel {
  @AutoMap()
  public id: string;
  @AutoMap()
  public created_at: Date;
  @AutoMap()
  public updated_at: Date;
}
