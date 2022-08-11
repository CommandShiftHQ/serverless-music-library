const { DynamoDB } = require('aws-sdk');
const configureAws = require('../utils/configureAws');
const handler = require('../../handler');

describe('createArtist', () => {
  let db;

  beforeAll(() => {
    configureAws();
    db = new DynamoDB.DocumentClient();
  });

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

  it('creates a new artist in the database', async () => {
    const data = {
      name: 'name',
      genre: 'genre',
    };
    const body = JSON.stringify(data);

    const response = await handler.run({
      body
    });
    const payload = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(payload.name).toBe('name');
    expect(payload.genre).toBe('genre');
    expect(payload.id).toBeTruthy();

    const dbKey = `ARTIST#${payload.id}`;
    const params = {
      Key: {
        partitionKey: dbKey,
        sortKey: dbKey
      },
      TableName: process.env.TABLE_NAME
    };

    const { Item } = await db.get(params).promise();

    expect(Item.name).toBe('name');
    expect(Item.genre).toBe('genre');
  });

  it('returns a 400 status code if name is undefined', async () => {
    const data = {
      genre: 'genre',
    };
    const body = JSON.stringify(data);

    const response = await handler.run({
      body
    });
    const payload = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(payload.errors[0].message).toBe('"name" is required');
  });

  it('returns a 400 status code if genre is undefined', async () => {
    const data = {
      name: 'name'
    };
    const body = JSON.stringify(data);

    const response = await handler.run({
      body
    });
    const payload = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(payload.errors[0].message).toBe('"genre" is required');
  });
});
