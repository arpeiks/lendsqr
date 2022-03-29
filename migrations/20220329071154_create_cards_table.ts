import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('card', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.string('exp').notNullable()
    table.string('cvv').notNullable()
    table.string('number').notNullable().unique()
    table.integer('account_id').unsigned().notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())

    table.foreign('account_id').references('id').inTable('account')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('card')
}
