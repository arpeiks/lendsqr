import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.increments('id').primary()

    table.string('firstname').notNullable()
    table.string('lastname').notNullable()
    table.string('middlename').nullable()

    table.string('email').index().unique().notNullable()
    table.string('phone').index().unique().notNullable()

    table.string('password').notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('user')
}
