const db = require("../data/db-config");

module.exports = {
  add,
  addStep,
  find,
  findBy,
  findById,
  remove,
  update,
  getStepsByGuide
};

function find() {
  return db("guides");
}

function findBy(filter) {
  return db("guides").where(filter);
}

function add(guide) {
  return db("guides")
    .returning("id")
    .insert(guide)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function addStep(step, id) {
  return db("steps")
    .insert(step)
    .where({ guide_id: id });
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

function getStepsByGuide(id) {
  return db("steps as s")
    .select(
      "s.step_number",
      "s.step_title",
      "s.step_description",
      "s.step_image_url"
    )
    .where({ "s.guide_id": id })
    .orderBy("s.step_number");
}
