module.exports.run = async (event) => {
  const { body } = event;
  try {
    return { statusCode: 201, body };
  } catch (err) {
    const responseBody = { message: 'bad request', error: err.message };
    return { statusCode: 402, body: JSON.stringify(responseBody) };
  }
};
