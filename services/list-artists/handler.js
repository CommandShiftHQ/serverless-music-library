const { DynamoDB } = require('aws-sdk');
const configureAws = require('aws-skd');
const ArtistRepository = require('./src/repository/artist');

const { TABLE_NAME } = process.env;
const db = new DynamoDB.DocumentClient();

configureAws();

module.exports.run = async () => {
  const artist = new ArtistRepository({
    dbClient: db,
    tableName: TABLE_NAME,
  });

  try {
    const artists = await artist.list()

    return { statusCode: 200, body: JSON.stringify(artists) }
  } catch (err) {
    const responseBody = { message: 'bad request', error: err.message };
    return { statusCode: 402, body: JSON.stringify(responseBody) };
  }
} 
