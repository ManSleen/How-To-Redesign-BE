const db = require("../data/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("users").select(
    "users.id",
    "users.name",
    "users.username",
    "users.email",
    "users.about_me",
    "users.profile_image_url"
  );
}

function findBy(filter) {
  return db("users")
    .select(
      "users.id",
      "users.name",
      "users.username",
      "users.email",
      "users.about_me",
      "users.profile_image_url"
    )
    .where(filter);
}

function add(user) {
  return db("users")
    .returning("id")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select(
      "users.id",
      "users.name",
      "users.username",
      "users.email",
      "users.about_me",
      "users.profile_image_url"
    )
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .del()
    .where({ id });
}

function update(changes, id) {
  return db("users")
    .update(changes)
    .where({ id })
    .then(() => findById(id));
}
