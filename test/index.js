const tap = require('tap');

const asyncFind = require('../');

tap.plan(3);

asyncFind([
  async () => { throw new Error(); },
  async () => { throw new Error(); },
  async () => 1,
  async () => { throw new Error(); },
])
  .then(result => tap.equal(result, 1));

const errorA = new Error();
const errorB = new Error();
const errorC = new Error();
asyncFind([
  async () => { throw errorA; },
  async () => { throw errorB; },
  async () => { throw errorC; },
])
  .then(() => tap.fail('Should not resolve'))
  .catch((error) => {
    tap.equal(error.code, 'ERR_FUNCTIONS_EXHAUSTED');
    tap.same(error.internalErrors, [errorA, errorB, errorC]);
  });
