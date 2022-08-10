const AWS = require('aws-sdk');
const setupAws = require('./configureAws');

module.exports = async () => {
  setupAws();
  const db = new AWS.DynamoDB();

  const params = {
    TableName: 'music-library'
  };

  await db.deleteTable(params).promise();
};
