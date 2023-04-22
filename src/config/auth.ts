import * as path from 'path';

interface RSAKeys {
  private: string;
  public: string;
}

interface JWTConfig {
  expiresIn: string;
  refreshExpiresIn: string;
  keys: RSAKeys;
}

interface AuthConfig {
  jwt: JWTConfig;
}

export const authConfig: AuthConfig = {
  jwt: {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    keys: {
      private: path.join(__dirname, '../shared/infra/keys/private-key.pem'),
      public: path.join(__dirname, '../shared/infra/keys/public-key.pem'),
    },
    refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  },
};
