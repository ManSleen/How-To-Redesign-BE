const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("guides");
}

function findBy(filter) {
  return db("guides").where(filter);
}

function add(user) {
  return db("guides")
    .returning("id")
    .insert(user)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("guides")
    .where({ id })
    .first();
}

function remove(id) {
  return db("guides")
    .del()
    .where({ id });
}

function update(changes, id) {
  return db("guides")
    .update(changes)
    .where({ id })
    .then(() => findById(id));
}
