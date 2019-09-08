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
  return db("steps");
}

function findBy(filter) {
  return db("steps").where(filter);
}

function add(step) {
  return db("steps")
    .returning("id")
    .insert(step)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("steps")
    .where({ id })
    .first();
}

function remove(id) {
  return db("steps")
    .del()
    .where({ id });
}

function update(changes, id) {
  return db("steps")
    .update(changes)
    .where({ id })
    .then(() => findById(id));
}
