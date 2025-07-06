import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.table('guests').select().where('name', '=', 'Lenildo Rocha Machado').first().update({ 'guests': '\'X Sara Cristina Rocha\', \'X Jefferson dos Santos Meneses da Silva\', \'X Alessandra Oliveira Silva Rocha\', \'X Rebeca Silva Rocha\'' });
}


export async function down(knex: Knex): Promise<void> {
  const data = await knex.table('guests').select().where('name', '=', 'Lenildo Rocha Machado').first();
  if(data) {
    await knex.table('guests').select().where('name', '=', 'Lenildo Rocha Machado').update({ 'guests': '\'X Sara Cristina Rocha\', \'X Jefferson dos Santos Meneses da Silva\', \'X Alessandra Oliveira Silva Rocha\', \'X Rebeca Silva Rocha\'' });
  } else {
    await knex.table('guests').insert({
      'name': 'Lenildo Rocha',
      'guests': '\'X Sara Cristina Rocha\', \'X Jefferson dos Santos Meneses da Silva\', \'X Alessandra Oliveira Silva Rocha\', \'X Rebeca Silva Rocha\''
    }
    );
  }
}

