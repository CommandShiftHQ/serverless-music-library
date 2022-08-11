const { DynamoDB } = require('aws-sdk')
const configureAws = require('./src/utils/configureAws')
const ArtistRepository = require('./src/repository/artist')

configureAws()

const db = new DynamoDB.DocumentClient()

module.exports.run = async (event) => {
  const { TABLE_NAME } = process.env
  const { id } = event.pathParameters;
  const artist = new ArtistRepository({
    dbClient: db,
    tableName: TABLE_NAME,
  });
  
  const body = await artist.read(id);
  return {statusCode: 200, body: JSON.stringify(body)}
}