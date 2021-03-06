const db = require("../data/db-config");

module.exports = {
  add,
  addStep,
  find,
  findBy,
  findById,
  remove,
  update,
  getStepsByGuide,
  addLike,
  getLikesByGuide
};

function find() {
  return db("guides as g")
  .select("g.id", "g.guide_name", "g.guide_description", "g.date_created", "g.guide_category", "g.guide_image", "g.guide_keywords", "g.guide_materials", "g.guide_tools", "u.username")
    .innerJoin("users as u", "g.guide_creator", "=", "u.id")
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
  .returning("id")
    .insert(step)
    .where({ guide_id: id })
    .then(ids => {
      const [id] = ids;
      return db("steps")
        .where({ id })
        .first();
    });
}

function addLike(like, id) {
  return db("likes")
    .insert(like)
    .where({ guide_id: id });
}

function findById(id) {
  return db("guides as g")
    .select("g.id", "g.guide_name", "g.guide_description", "g.date_created", "g.guide_category", "g.guide_image", "g.guide_keywords", "g.guide_materials", "g.guide_tools", "u.username")
    .innerJoin("users as u", "g.guide_creator", "=", "u.id")
    .where({ "g.id": id })
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

function getLikesByGuide(id) {
  return db("likes as l").where({ "l.guide_id": id });
}
