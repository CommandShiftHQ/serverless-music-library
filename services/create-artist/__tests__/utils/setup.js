const aws = require('aws-sdk');

require('dotenv').config();

const { DYNAMO_DB_PORT } = process.env;

module.exports = async () => {
  aws.config.update({
    endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
    region: 'region',
    credentials: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  });
};
