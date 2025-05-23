import { Kysely, SqliteDatabase, sql } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('username', 'text', (c) => c.notNull())
    .addColumn('role', 'text', (c) =>
      c.notNull().check(sql`role IN ('admin', 'user')`)
    )
    .execute()

  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('total_tickets', 'integer')
    .execute()

  await db.schema
    .createTable('tickets')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('user_id', 'integer', (c) => c.notNull().references('users.id'))
    .addColumn('screening_id', 'integer', (c) =>
      c.notNull().references('screenings.id')
    )
    .execute()
}
