const { run } = require('../index');

describe('run', () => {
  it('returns a 201 status', () => {
    const data = { name: 'Jimmy Eat World', genre: 'rock' };
    const body = JSON.stringify(data);
    const actual = run({ body });

    expect(actual.statusCode).toBe(201);
  });
});
