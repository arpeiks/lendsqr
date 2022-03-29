import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('account', (table: Knex.TableBuilder) => {
    table.string('otp').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('account')
}
