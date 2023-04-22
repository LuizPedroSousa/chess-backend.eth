import { User } from '@modules/users/core/domain/User';
import { ChessProvider } from '@shared/application/contracts/providers/ChessProvider/ChessProvider';
import { GetUserDTO } from '@shared/application/contracts/providers/ChessProvider/DTOs/GetUserDTO';
import { InvalidCodeException } from '@shared/application/contracts/providers/ChessProvider/exceptions/InvalidCodeException';
import { Either, left, right } from '@shared/domain/Either';
import { InvalidException } from '@shared/domain/exceptions/InvalidException';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException';
import { mapper } from '@shared/infra/mappings/mapper';
import axios from 'axios';
import { injectable } from 'tsyringe';
import { UserModel } from './models/UserModel';

const api = axios.create({
  baseURL: 'https://lichess.org/api',
});

const getAccount = async (token: string) => {
  const { data } = await api.get('/account', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const getEmail = async (token: string) => {
  const { data } = await api.get('/account/email', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data?.email;
};

@injectable()
export class LichessChessProvider implements ChessProvider {
  async getUser(data: GetUserDTO): Promise<Either<NotFoundException, User>> {
    try {
      const account = await getAccount(data.token);
      const email = await getEmail(data.token);

      if (data.email !== email) {
        return left(new InvalidException('Invalid user credentials'));
      }

      return right(mapper.map({ ...account, email }, UserModel, User));
    } catch (error: any) {
      const errors: any = {
        invalid_grant: () => new InvalidCodeException(),
      };

      const errorExists = errors[error?.response?.data?.error];
      return errorExists ? left(errorExists()) : left(new NotFoundException('User not found by gateway'));
    }
  }
}
