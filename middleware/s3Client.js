const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  // TODO: fix endpoint and acceskeys to env
  endpoint: "https://ams3.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: 'DO00WZRBXTCQZ8GWCPJQ',
    secretAccessKey: 'ocis/d7AjuhE+hazeY/Ue0h0qpwWWawyeSVV4XFzy1k'
  }
});

module.exports = s3
