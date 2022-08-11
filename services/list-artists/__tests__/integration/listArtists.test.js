const { DynamoDB } = require('aws-sdk');
const configureAws = require('../utils/configureAws');
const handler = require('../../handler');

describe('createArtist', () => {
  let db;

  beforeAll(() => {
    configureAws();
    db = new DynamoDB();
  });

  beforeEach(() => {})

  afterEach(async () => {
    const params = {
      TableName: process.env.TABLE_NAME
    };

    const { Items } = await db.scan(params).promise();

    await Promise.all(Items.map(async (item) => {
      const { partitionKey, sortKey } = item;
      const deleteParams = {
        TableName: process.env.TABLE_NAME,
        Key: {
          partitionKey,
          sortKey,
        },
      };

      await db.deleteItem(deleteParams).promise();
    }));
  });

  it('returns all artists in the database', async () => {
    const response = await handler.run();

    const payload = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(payload.name).toBe('name');
    expect(payload.genre).toBe('genre');
    expect(payload.id).toBeTruthy();

    console.log(payload)
  });
});
