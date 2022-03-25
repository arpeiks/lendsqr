import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('account', (table: Knex.TableBuilder) => {
    table.integer('user_id').unsigned().nullable()
    table.foreign('user_id').references('id').inTable('user')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('account')
}
