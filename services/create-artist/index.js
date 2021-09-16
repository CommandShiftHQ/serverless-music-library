const { DynamoDB } = require('aws-sdk');
const uuid = require('uuid');
const Artist = require('./lib/repository/artist');

const { TABLE_NAME } = process.env;
const db = new DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const artist = new Artist({
    dbClient: db,
    tableName: TABLE_NAME,
    keyGenerator: uuid.v4,
  });
  try {
    const data = JSON.parse(event.body);

    const dbResponse = await artist.create(data);

    const responseBody = JSON.stringify(dbResponse);

    return { statusCode: 201, body: responseBody };
  } catch (err) {
    const responseBody = { message: 'bad request', error: err.message };
    return { statusCode: 402, body: JSON.stringify(responseBody) };
  }
};
