# async-find

Based upon the behaviour of `Array.find`, an asynchronous function which iterates an array of
asynchronous functions (or Promises), one by one sequentially, evaluating each one in turn until one
resolves.

As soon as one resolves, the resolved response is returned and the process halts.

If all functions reject, the function itself rejects with a specific `ExhaustionError`. This can be
identified by checking the `code` property on the error object equals `ERR_FUNCTIONS_EXHAUSTED`.

## Example

```
const asyncFind = require('async-find');

async function rejectingAsyncFunction(i) {
  console.log(i);
  throw new Error();
}

async function resolvingAsyncFunction() {
  return 'Resolved!';
}

asyncFind([
  () => rejectingAsyncFunction(1),
  () => rejectingAsyncFunction(2),
  resolvingAsyncFunction,
  () => rejectingAsyncFunction(3),
])
  .then(console.log);
```

Will return:

```
1
2
Resolved!
```

The final function is never called, because the previous function resolved.

## Author

- Created by [@andybee](https://twitter.com/andybee)

## License

MIT
