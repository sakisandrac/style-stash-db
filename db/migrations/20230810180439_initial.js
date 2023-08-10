/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.up = function (knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.string('username');
      table.string('password');

      table.timestamps(true, true);
    })

    .createTable('piece', function (table) {
      table.increments('id').primary();
      table.string('note');
      table.string('image');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('user.id');
      table.string('category_id')

      table.timestamps(true, true);
    })

    .createTable('outfit', function (table) {
      table.increments('id').primary();
      table.string('note');
      table.string('image');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('user.id');

      table.timestamps(true, true);
    })

    .createTable('outfit_to_piece', function (table) {
      table.increments('id').primary();
      table.integer('piece_id').unsigned()
      table.foreign('piece_id')
        .references('piece.id');
      table.integer('outfit_id').unsigned()
      table.foreign('outfit_id')
        .references('outfit.id');

      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
  .dropTable('user')
  .dropTable('piece')
  .dropTable('outfit')
  .dropTable('outfit_to_piece')
};
