import { BaseEntity } from '@shared/domain/BaseEntity';

interface TokenProps {
  owner_id: string;
  access_token: string;
}

export class Token extends BaseEntity {
  public owner_id: string;
  public access_token: string;

  constructor(props: TokenProps) {
    super();
    Object.assign(this, props);
  }
}
