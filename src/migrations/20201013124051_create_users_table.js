exports.up = (knex) => {
  return knex.schema.createTable('user', (t) => {
    t.increments('use_id').primary().notNull();
    t.string('use_username', 60).unique().notNull();
    t.string('use_email', 60).unique().notNull();
    t.string('use_name', 30).notNull();
    t.string('use_last_name', 120).notNull();
    t.string('use_password', 255).notNull();
    t.datetime('cat_createdAt').notNull();
    t.datetime('cat_updatedAt');
    t.datetime('cat_deletedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('user');
};
