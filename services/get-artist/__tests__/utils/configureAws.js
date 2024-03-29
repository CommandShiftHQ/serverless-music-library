const AWS = require('aws-sdk');
require('dotenv').config();

const { DYNAMO_DB_PORT } = process.env;

module.exports = () => {
  AWS.config.update({
    endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
    region: 'eu-west-2',
    credentials: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  });
};
