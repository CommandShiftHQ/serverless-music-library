const AWS = require('aws-sdk');
require('dotenv').config();

const { DYNAMO_DB_PORT } = process.env;

module.exports = async () => {
  AWS.config.update({
    endpoint: `http://localhost:${DYNAMO_DB_PORT}`,
    region: 'eu-west-2',
    credentials: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  });

  const db = new AWS.DynamoDB();

  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'partitionKey',
        AttributeType: 'S'
      },
      {
        AttributeName: 'sortKey',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'partitionKey',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'sortKey',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'music-library'
  };

  await db.createTable(params).promise();
};
