class Artist {
  constructor({ dbClient, tableName}) {
    this.db = dbClient;
    this.tableName = tableName;
  }

  async read(id) {
    const key = `ARTIST#${id}`
    const { Item } = await this.db.get({
      TableName: this.tableName,
      Key: {
        partitionKey: key,
        sortKey: key
      }
    }).promise();

    return {
      id: Item.partitionKey.split('#')[1],
      name: Item.name,
      genre: Item.genre
    }
  }
}

module.exports = Artist;