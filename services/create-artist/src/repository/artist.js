class Artist {
  constructor({ dbClient, tableName, keyGenerator }) {
    this.db = dbClient;
    this.tableName = tableName;
    this.keyGenerator = keyGenerator;
  }

  async create(data) {
    const { name, genre } = data;
    const UUID = this.keyGenerator();

    const partitionKey = `ARTIST#${UUID}`;
    const sortKey = `ARTIST#${UUID}`;
    const Item = {
      partitionKey,
      sortKey,
      name,
      genre,
    };

    try {
      await this.db.put({
        TableName: this.tableName,
        Item,
      }).promise();
      return {
        id: UUID,
        name,
        genre,
      };
    } catch (err) {
      return err;
    }
  }
}

module.exports = Artist;
