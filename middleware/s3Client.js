const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  // TODO: fix endpoint and acceskeys to env
  endpoint: "https://fra1.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: 'DO004Y9HHACFPQBL6XWB',
    secretAccessKey: '3eH8utMTpLTUcF2hvcQhU9NwO1RU6WtJ4O2EJ1WPFU0'
  }
});

module.exports = s3
