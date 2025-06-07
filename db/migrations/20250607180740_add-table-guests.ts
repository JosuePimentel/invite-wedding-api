import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists('guests', table => {
    table.increments('id').primary();
    table.text('name');
    table.text('guests');
    table.boolean('accepted').defaultTo(false);
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('guests');
}

