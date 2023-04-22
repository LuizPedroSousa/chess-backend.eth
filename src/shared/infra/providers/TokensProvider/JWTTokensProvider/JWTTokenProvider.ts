import fs from 'fs';
import { injectable } from 'tsyringe';

import jwt from 'jsonwebtoken';

import { Token } from '@modules/tokens/core/domain/Token';
import { GenerateTokenDTO } from '@shared/application/contracts/providers/TokensProvider/DTOs/GenerateTokenDTO';
import { TokensProvider } from '@shared/application/contracts/providers/TokensProvider/TokensProvider';
import { Either, left, right } from '@shared/domain/Either';

import { authConfig } from '@config/auth';
import { InvalidException } from '@shared/domain/exceptions/InvalidException';

@injectable()
export class JWTTokensProvider implements TokensProvider {
  async generate({ access_token, user }: GenerateTokenDTO) {
    // Load the RSA private key
    const privateKey = fs.readFileSync(authConfig.jwt.keys.private);

    // Define the payload for the JWT
    const payload = {
      sub: user.id,
      access_token,
      issuer: process.env.JWT_ISSUER,
    };

    // Generate a JWT token using RSA and the private key
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '60m' });

    return token;
  }

  async decode(access_token: string): Promise<Either<InvalidException, Token>> {
    try {
      const key = fs.readFileSync(authConfig.jwt.keys.public);

      const decoded = jwt.verify(access_token, key, { algorithms: ['RS256'] }) as any;

      return right(
        new Token({
          access_token: decoded.access_token,
          owner_id: decoded.sub,
        }),
      );
    } catch (error: any) {
      return left(new InvalidException('Invalid token exception'));
    }
  }
}
