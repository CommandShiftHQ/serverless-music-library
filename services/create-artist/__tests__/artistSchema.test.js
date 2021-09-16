const artistSchema = require('../src/schema/artist');

describe('artistSchema', () => {
  it('does not error if given a name and genre', () => {
    const { error } = artistSchema.validate({ genre: 'genre', name: 'name' });
    expect(error).toBeFalsy();
  });
  it('requires a name', () => {
    const { error } = artistSchema.validate({ genre: 'genre' });
    expect(error).toBeTruthy();
  });
  it('requires a genre', () => {
    const { error } = artistSchema.validate({ name: 'name' });
    expect(error).toBeTruthy();
  });
  it('requires name to not be empty', () => {
    const { error } = artistSchema.validate({ genre: 'genre', name: '' });
    expect(error).toBeTruthy();
  });
  it('requires genre to not be empty', () => {
    const { error } = artistSchema.validate({ genre: '', name: 'name' });
    expect(error).toBeTruthy();
  });
  it('does not allow additional fields', () => {
    const { error } = artistSchema.validate({ genre: 'genre', name: 'name', foo: 'bar' });
    expect(error).toBeTruthy();
  });
});
