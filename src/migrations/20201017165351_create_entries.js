exports.up = (knex) => {
  return knex.schema.createTable('entry', (t) => {
    t.increments('ent_id').notNull().primary();
    t.string('ent_name', 60).notNull();
    t.decimal('ent_amount').notNull();
    t.string('ent_type', 20).notNull();
    t.string('ent_paid', 1);
    t.string('ent_description', 255).notNull();
    t.datetime('ent_date_paid');
    t.datetime('ent_createdAt').notNull();
    t.datetime('ent_updatedAt');
    t.datetime('ent_deletedAt');
    t.integer('user_id').references('use_id').inTable('user').notNull();
    t.integer('category_id').references('cat_id').inTable('category').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('entry');
};
