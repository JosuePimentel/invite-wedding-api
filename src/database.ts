import knex, { Knex } from 'knex';
import 'dotenv/config';

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.NODE_ENV === 'development'
      ? './db/app.db'
      : process.env.DATABASE_URL!.toString(),
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
};

export const database = knex(config);