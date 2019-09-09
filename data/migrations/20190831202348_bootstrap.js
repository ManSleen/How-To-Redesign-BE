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
      guides.string("guide_category", 255).notNullable();
      guides.string("guide_image", 4000).notNullable();
      guides.string("guide_keywords", 4000).notNullable();
      guides.string("guide_materials", 4000).notNullable();
      guides.string("guide_tools", 4000).notNullable();
      guides
        .integer("guide_creator")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("steps", steps => {
      steps.increments();
      steps.string("step_title", 500).notNullable();
      steps.string("step_description", 2000).notNullable();
      steps
        .integer("step_number")
        .unsigned()
        .notNullable();
      steps.string("step_image_url", 4000).notNullable();
      steps
        .integer("guide_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("guides")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("likes", likes => {
      likes.increments();
      likes
        .integer("guide_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("guides")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      likes
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("likes")
    .dropTableIfExists("tools")
    .dropTableIfExists("materials")
    .dropTableIfExists("keywords")
    .dropTableIfExists("steps")
    .dropTableIfExists("keywords")
    .dropTableIfExists("guides")
    .dropTableIfExists("users");
};
