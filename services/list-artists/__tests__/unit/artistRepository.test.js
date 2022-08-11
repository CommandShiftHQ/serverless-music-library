const Artist = require('../../src/repository/artist');

describe('Artist', () => {
  describe('list', () => {
    it('returns all artists in the db', (done) => {
      const data = {
        name: 'artistName',
        genre: 'genre',
      };
      const expected = {
        id: 'artistId',
        ...data,
      };
      const stubDbClient = { scan: () => ({ promise: () => Promise.resolve({ ...expected }) }) };
      const artist = new Artist({
        dbClient: stubDbClient,
        tableName: 'tableName',
      });

      artist.list(data).then((actual) => {
        expect(actual).toEqual(expected);
        done();
      });
    });
  });
});