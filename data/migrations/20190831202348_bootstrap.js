exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
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
    })

    .createTable("guides", guides => {
      guides.increments();
      guides.string("guide_name", 500).notNullable();
      guides.string("guide_description", 1000).notNullable();
      guides.date("date_created").notNullable();
      guides.string("guide_image", 4000).notNullable();
      guides
        .integer("guide_creator")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
