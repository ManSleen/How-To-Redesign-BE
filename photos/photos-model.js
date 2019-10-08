const db = require('../data/db-config');

module.exports = {
  getPhotoById,
  getPhotosByGuideId,
  addPhoto,
  deletePhoto
};

function getPhotoById(id) {
  return db('photos')
    .select('*')
    .where('id', id)
    .first();
}

function getPhotosByGuideId(id) {
  return db('photos')
    .select('*')
    .where('guideId', id);
}

function addPhoto(photo) {
  return db('photos')
    .returning('id')
    .insert(photo);
}

function deletePhoto(id) {
  return db('photos')
    .del()
    .where('id', id);
}
