/** Subclass of Error which represents when all functions have been exhausted. */
class ExhaustionError extends Error {
  /**
   * Create an error.
   */
  constructor() {
    super('Exhausted all asynchronous functions, none resolved');
    this.code = 'ERR_FUNCTIONS_EXHAUSTED';
  }
}

/**
 * Returns an asynchronous function which evaluates each asynchronous function or Promise in the
 * supplied array, one by one, until one resolves. If all fail to resolve an Error is thrown.
 *
 * @param {Promise[]} functions - An array of asynchronous to be evaluated, one by one, until one
 * resolves.
 */
async function asyncFunctionFind(functions = []) {
  return functions
    .concat(() => { throw new ExhaustionError(); })
    .reduce((promise, fn) => promise.catch(fn), Promise.reject());
}

module.exports = asyncFunctionFind;
