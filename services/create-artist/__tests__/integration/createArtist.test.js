const handler = require('../../handler');

describe('createArtist', () => {
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
  });
});
