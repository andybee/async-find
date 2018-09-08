const tap = require('tap');

const asyncFind = require('../');

tap.plan(2);

asyncFind([
  async () => { throw new Error(); },
  async () => { throw new Error(); },
  async () => 1,
  async () => { throw new Error(); },
])
  .then(result => tap.equal(result, 1));

asyncFind([
  async () => { throw new Error(); },
  async () => { throw new Error(); },
  async () => { throw new Error(); },
])
  .then(() => tap.fail('Should not resolve'))
  .catch(error => tap.equal(error.code, 'ERR_FUNCTIONS_EXHAUSTED'));
