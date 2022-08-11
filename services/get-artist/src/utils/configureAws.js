const AWS = require('aws-sdk');

const { NODE_ENV, DYNAMO_DB_PORT } = process.env;

module.exports = () => {
  if (NODE_ENV === 'test') {
    AWS.config.update({
      endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
      region: 'eu-west-2',
      credentials: {
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey'
      }
    });
  }
};
