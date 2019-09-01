exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 255)
      .notNullable()
      .unique();
    users.string("password", 255).notNullable();
    users
      .string("email", 255)
      .notNullable()
      .unique();
    users.string("about_me", 4000);
    users.string("profile_image_url", 4000);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
