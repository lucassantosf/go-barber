const hello = require('./hello');

describe('Exemplo', () => {
  it('To create new user', () => {
    const person = 'abc';
    const msg = hello(person);
    expect(msg).toBe('hello abc');
  });
});
