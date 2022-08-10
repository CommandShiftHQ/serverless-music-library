const AWS = require('aws-sdk');
const setupAws = require('./configureAws');

module.exports = async () => {
  setupAws();
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
