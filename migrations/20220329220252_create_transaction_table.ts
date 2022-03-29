import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable(
    'transaction',
    (table: Knex.TableBuilder) => {
      table.increments('id').primary()
      table.json('from').notNullable()
      table.string('t_type').notNullable()
      table.string('t_method').notNullable()
      table.string('status').defaultTo('UNCONFIRMED')
      table.decimal('amount').notNullable().defaultTo(0.0)

      table.integer('account_id').unsigned().notNullable()

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())

      table.foreign('account_id').references('id').inTable('account')
    },
  )
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('transaction')
}
