import knex, { Knex } from 'knex';
import 'dotenv/config';

export const config: Knex.Config = {
  client: process.env.NODE_ENV === 'development' ? 'sqlite3' : 'pg',
  connection: process.env.NODE_ENV === 'development'
    ? {
      filename: './db/app.db'
    }
    : process.env.DATABASE_URL!.toString(),
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const database = knex(config);