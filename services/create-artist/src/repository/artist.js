class Artist {
  constructor({ dbClient, tableName, keyGenerator }) {
    this.db = dbClient;
    this.tableName = tableName;
    this.keyGenerator = keyGenerator;
  }

  async create(data) {
    const { name, genre } = data;
    const partitionKey = `ARTIST$${this.keyGenerator()}`;
    const sortKey = 'PROFILE$';
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
      return Item;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Artist;
