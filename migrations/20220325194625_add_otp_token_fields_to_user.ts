import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('user', (table: Knex.TableBuilder) => {
    table.string('otp').nullable()
    table.string('token').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('user')
}
