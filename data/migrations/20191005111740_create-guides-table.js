
exports.up = function(knex) {
    return knex.schema
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
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("guides")
};
