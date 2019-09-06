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

    .createTable("keywords", keywords => {
      keywords.increments();
      keywords.string("keyword", 255).notNullable();
      keywords
        .integer("guide_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("guides")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("materials", materials => {
      materials.increments();
      materials.string("material", 1000).notNullable();
      materials
        .integer("guide_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("guides")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("tools", tools => {
      tools.increments();
      tools.string("tool", 1000).notNullable();
      tools
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
  return knex.schema.dropTableIfExists("users");
};
