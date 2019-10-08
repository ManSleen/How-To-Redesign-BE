const router = require("express").Router();
const Photos = require("./photos-model");
require('dotenv').config();
const uuid = require('uuid/v1')
const AWS = require('aws-sdk');

const accessKey = process.env.S3_SECRET_ACCESS_KEY;
const accessId = process.env.S3_ACCESS_KEY_ID;

const s3 = new AWS.S3({
  accessKeyId: accessId,
  secretAccessKey: accessKey,
  signatureVersion: 'v4',
  region: 'us-west-1'
})


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
})

router.get("/one/:id", (req, res) => {
  const {id} = req.params;
  Photos.getPhotoById(id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

router.get("/:guideId", )

module.exports = router;
