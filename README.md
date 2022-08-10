# serverless-music-library

serverless version of the music-library project

## Integration Testing

Integration tests require a dynamodb. For development, `dynamodb-local` was used.

### Setting up dynamodb-local

Run `dynamodb-local` inside a docker container:

```bash
docker run -p 8000:8000 amazon/dynamodb-local
```

Create the database:

```bash
aws dynamodb create-table --table-name music-library --attribute-definitions AttributeName=partitionKey,AttributeType=S AttributeName=sortKey,AttributeType=S --key-schema AttributeName=partitionKey,KeyType=HASH AttributeName=sortKey,KeyType=RANGE --billing-mode PAY_PER_REQUEST --endpoint-url http://localhost:8000
```

Note that `aws-cli` will need to be installed, and configured with the same mock credentials as the `configureAws` util:

```JavaScript
// services/create-artist/src/utils/configureAws.js
{
  region: 'eu-west-2',
  credentials: {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey'
  }
}
```
