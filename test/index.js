const assert = require('node:assert');
const test = require('node:test');

const asyncFind = require('../');

test('resolves with first resolution', async (t) => {
  const result = await asyncFind([
    async () => { throw new Error(); },
    async () => { throw new Error(); },
    async () => 1,
    async () => { throw new Error(); },
    async () => 2,
  ]);

  assert.equal(result, 1);
});

test('rejects if all rejections', async (t) => {
  const errorA = new Error();
  const errorB = new Error();
  const errorC = new Error();

  await assert.rejects(
    () => asyncFind([
      async () => { throw errorA; },
      async () => { throw errorB; },
      async () => { throw errorC; },
    ]),
    {
      code: 'ERR_FUNCTIONS_EXHAUSTED',
      internalErrors: [errorA, errorB, errorC],
    },
  );
});
