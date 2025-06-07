// eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    guests: {
      id: string,
      name: string,
      guests: string,
      accepted: boolean
    },
  }
}