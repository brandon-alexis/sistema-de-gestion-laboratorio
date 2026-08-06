import 'dotenv/config';

export const {
  PORT: port = 3000,
  POSTGRES_HOST: postgresHost = 'localhost',
  POSTGRES_PORT: postgresPort = 5432,
  POSTGRES_USER: postgresUser = 'postgres',
  POSTGRES_PASSWORD: postgresPassword = '123456789',
} = process.env;
