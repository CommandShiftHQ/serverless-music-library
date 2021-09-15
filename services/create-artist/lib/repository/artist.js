class Artist {
  constructor({ dbClient, tableName, keyGenerator }) {
    this.db = dbClient;
    this.tableName = tableName;
    this.keyGenerator = keyGenerator;
  }

  async create(data) {
    const { name, genre } = data;
    const artistId = this.keyGenerator();
    const recordType = 'PROFILE';
    const Item = {
      artistId,
      recordType,
      name,
      genre,
    };

    try {
      await this.db.put({
        TableName: this.tableName,
        Item,
      }).promise();
      return Item;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Artist;
