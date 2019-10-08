exports.up = function(knex) {
    return knex.schema.createTable('photos', photos => {
      photos.increments('id');
      photos
        .integer('guideId')
        .unsigned()
        .references('guides.id')
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  
      photos
        .string('url')
        .unique()
        .notNullable();
  
      photos.text('description').defaultTo(null);
      photos.text('title').defaultTo(null);
  
      photos.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('photos');
  };
  