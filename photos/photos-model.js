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

function getPhotosByGuideId() {
  return db('photos')
    .select('*')
    .insert(photo);
}

function addPhoto(photo) {
  return db('photos')
    .returning('id')
    .insert(photo);
}

function deletePhoto() {
  return;
}
