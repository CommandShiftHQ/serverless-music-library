class Artist {
  constructor({ dbClient, tableName }) {
    this.db = dbClient;
    this.tableName = tableName;
  }

  async list() {
    const params = {
      TableName: this.tableName,
      FilterExpression: '#partitionKey = #sortKey',
      ExpressionAttributeNames: { '#partitionKey': 'partitionKey', '#sortKey': 'sortKey' }
    }

    const response = await this.db.scan(params).promise();

    return response.Items.map(item => ({
      id: item.partitionKey.split('#')[1],
      name: item.name,
      genre: item.genre
    }));
  }
}

module.exports = Artist;