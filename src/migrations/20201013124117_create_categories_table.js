exports.up = (knex) => {
  return knex.schema.createTable('category', (t) => {
    t.increments('cat_id').notNull().primary();
    t.string('cat_name', 60).notNull().unique();
    t.string('cat_description', 255).notNull();
    t.datetime('cat_createdAt').notNull();
    t.datetime('cat_updatedAt');
    t.datetime('cat_deletedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('category');
};
