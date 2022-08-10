const { DynamoDB } = require('aws-sdk');
const uuid = require('uuid');
const configureAws = require('./src/utils/configureAws');
const ArtistRepository = require('./src/repository/artist');
const artistSchema = require('./src/schema/artist');

configureAws();

const { TABLE_NAME } = process.env;
const db = new DynamoDB.DocumentClient();

module.exports.run = async (event) => {
  const artist = new ArtistRepository({
    dbClient: db,
    tableName: TABLE_NAME,
    keyGenerator: uuid.v4,
  });
  try {
    const body = JSON.parse(event.body);
    const { value, error } = artistSchema.validate(body);

    if (error) {
      return { statusCode: 401, body: JSON.stringify({ errors: error.details }) };
    }

    const dbResponse = await artist.create(value);
    return { statusCode: 201, body: JSON.stringify(dbResponse) };
  } catch (err) {
    const responseBody = { message: 'bad request', error: err.message };
    return { statusCode: 402, body: JSON.stringify(responseBody) };
  }
};
