const router = require('express').Router();
const Photos = require('./photos-model');
require('dotenv').config();
const uuid = require('uuid/v1');
const AWS = require('aws-sdk');

const accessKey = process.env.S3_SECRET_ACCESS_KEY;
const accessId = process.env.S3_ACCESS_KEY_ID;

const s3 = new AWS.S3({
  accessKeyId: accessId,
  secretAccessKey: accessKey,
  signatureVersion: 'v4',
  region: 'us-west-1'
});

router.post('/signed', (req, res) => {
  const { id } = req.body;
  const key = `${id}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      // name of bucket you created
      Bucket: 'how-to-photos',
      ContentType: 'image/*',
      Key: key
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
});

router.get('/one/:id', (req, res) => {
  const { id } = req.params;
  Photos.getPhotoById(id)
    .then(photo => {
      res.status(200).json(photo);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/:guideId', (req, res) => {
  const { guideId } = req.params;
  Photos.getPhotosByGuideId(guideId)
    .then(photo => {
      res.status(200).json(photo);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.post('/', (req, res) => {
  const photo = req.body;
  Photos.addPhoto(photo)
    .then(photo => {
      res.status(201).json(photo);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let foundPhoto;
  Photos.getPhotoById(id)
    .then(photo => {
      foundPhoto = photo;
      if (photo) {
        Photos.deletePhoto(id)
          .then(photo => {
            res.status(200).json(foundPhoto);
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find a photo with that ID in the db' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
