const db = require('../data/db-config');


module.exports = {
    getPhotoById,
    getPhotosByGuideId,
    addPhoto,
    deletePhoto
}

function getPhotoById(id) {
    return db("photos")
        .select('*')
        .where("id", id)
}

function getPhotosByGuideId() {
    return
}

function addPhoto() {
    return
}

function deletePhoto() {
    return
}