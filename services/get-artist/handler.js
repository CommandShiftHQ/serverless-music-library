module.exports.run = async (event) => {
  const { id } = event.pathParameters;
  const body = { id }
  return {statusCode: 200, body: JSON.stringify(body)}
}