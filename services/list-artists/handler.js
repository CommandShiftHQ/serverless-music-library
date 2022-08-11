const { DynamoDB } = require('aws-sdk');
const configureAws = require('./src/utils/configureAws');
const ArtistRepository = require('./src/repository/artist');

configureAws();

const { TABLE_NAME } = process.env;
const db = new DynamoDB.DocumentClient();

module.exports.run = async () => {
  const artist = new ArtistRepository({
    dbClient: db,
    tableName: TABLE_NAME,
  });

  try {
    const artists = await artist.list()

    return { statusCode: 200, body: JSON.stringify(artists) }
  } catch (err) {
    const responseBody = { error: err.message };
    return { statusCode: 500, body: JSON.stringify(responseBody) };
  }
} 
