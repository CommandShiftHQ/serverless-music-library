const Artist = require('../lib/repository/artist');

describe('Artist', () => {
  describe('create', () => {
    it('returns the created artist', (done) => {
      const data = {
        name: 'artistName',
        genre: 'genre',
      };
      const expected = {
        artistId: 'artistId',
        recordType: 'PROFILE',
        ...data,
      };
      const stubKeyGenerator = () => 'artistId';
      const stubDbClient = { put: () => ({ promise: () => Promise.resolve({ ...expected }) }) };
      const artist = new Artist({
        dbClient: stubDbClient,
        tableName: 'tableName',
        keyGenerator: stubKeyGenerator,
      });

      artist.create(data).then((actual) => {
        expect(actual).toEqual(expected);
        done();
      });
    });
  });
});
