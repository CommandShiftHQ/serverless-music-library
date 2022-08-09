const aws = require('aws-sdk');

exports.awsConfig = () => {
  const { NODE_ENV, DYNAMO_DB_PORT } = process.env;

  if (NODE_ENV === 'test') {
    aws.config.update({
      endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
      region: 'region',
      credentials: {
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey'
      }
    });
  }
};
