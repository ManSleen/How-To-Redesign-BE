exports.up = function(knex) {
    return knex.schema
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
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("steps")
};
