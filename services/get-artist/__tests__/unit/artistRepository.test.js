const Artist = require('../../src/repository/artist');

describe('Artist', () => {
  describe('read', () => {
    it('returns the requested artist from the db', async () => {
      const responseData = { Item: {
        partitionKey: 'ARTIST#artistId',
        sortKey: 'ARTIST#artistId',
        name:  'name',
        genre: 'genre'
      }
    };

      const expected = {genre: 'genre', id: 'artistId', name: 'name'}

      const stubDbClient = { get: () => ({ promise: () => Promise.resolve(responseData) }) };
      const artist = new Artist({
        dbClient: stubDbClient,
        tableName: 'tableName',
      });

      const actual = await artist.read('artistId')
      expect(actual).toEqual(expected);
    });
  });
});