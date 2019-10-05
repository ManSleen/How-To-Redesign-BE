exports.up = function(knex) {
    return knex.schema
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
};
