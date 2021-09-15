const uuid = require('uuid');
const AWS = require('aws-sdk');

const { TABLE_NAME } = process.env;
const db = new AWS.DynamoDB();

const putItem = (data) => new Promise((resolve, reject) => {
  const { name, genre } = data;
  const artistId = uuid.v4();
  const recordType = 'PROFILE';
  const params = {
    TableName: TABLE_NAME,
    Item: {
      artistId: {
        S: artistId,
      },
      recordType: {
        S: recordType,
      },
      name: {
        S: name,
      },
      genre: {
        S: genre,
      },
    },
  };

  db.putItem(params, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve({
        artistId,
        recordType,
        name,
        genre,
      });
    }
  });
});

module.exports.run = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const dbResponse = await putItem(data);

    const responseBody = JSON.stringify(dbResponse);

    return { statusCode: 201, body: responseBody };
  } catch (err) {
    const responseBody = { message: 'bad request', error: err.message };
    return { statusCode: 402, body: JSON.stringify(responseBody) };
  }
};
