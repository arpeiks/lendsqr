import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(
    'account',
    (table: Knex.TableBuilder) => {
      table.increments('id').primary()

      table.string('number').notNullable().unique()
      table.decimal('balance').notNullable().defaultTo(0.0)

      table.string('pin').nullable()

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    },
  )
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('user')
}
