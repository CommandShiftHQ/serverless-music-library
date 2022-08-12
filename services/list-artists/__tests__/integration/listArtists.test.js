const { DynamoDB } = require('aws-sdk');
const configureAws = require('../utils/configureAws');
const handler = require('../../handler');

describe('listArtists', () => {
  let db;

  beforeAll(() => {
    configureAws();
    db = new DynamoDB.DocumentClient();
  });

  beforeEach(async () => {
    const items = [
      {
        id: 'ARTIST#artist1',
        name: 'artist1',
        genre: 'music'
      },
      {
        id: 'ARTIST#artist2',
        name: 'artist2',
        genre: 'music'
      }
    ]

    await Promise.all(items.map((item) => {
      const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
          partitionKey: item.id ,
          sortKey: item.id ,
          name: item.name ,
          genre: item.genre 
        }
      }
      return db.put(params).promise()}
    ))
  })

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

      await db.delete(deleteParams).promise();
    }));
  });

  it('returns all artists in the database', async () => {
    const response = await handler.run();

    const payload = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(payload).toContainEqual({
      id: 'artist1',
      name: 'artist1',
      genre: 'music'
    })
    expect(payload).toContainEqual({
      id: 'artist2',
      name: 'artist2',
      genre: 'music'
    })
  });
});
