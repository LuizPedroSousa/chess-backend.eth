import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '@shared/domain/BaseEntity';

export class User extends BaseEntity {
  @AutoMap()
  public name: string;
  @AutoMap()
  public email: string;
  @AutoMap()
  public username: string;

  @AutoMap()
  public coins?: number;

  @AutoMap()
  public score?: number;

  lose() {
    const final = (value: number) => value - 10;

    this.coins = final(this.coins) < 0 ? 0 : final(this.coins);
    this.score = final(this.score) < 0 ? 0 : final(this.score);
  }

  win() {
    this.coins = this.coins + 20;
    this.score = this.score + 20;
  }
}
