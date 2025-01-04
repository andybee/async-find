/** Subclass of Error which represents when all functions have been exhausted. */
export class ExhaustionError extends Error {
  /**
   * Create an error.
   */
  constructor() {
    super('Exhausted all asynchronous functions, none resolved');
    this.code = 'ERR_FUNCTIONS_EXHAUSTED';
    this.internalErrors = [];
  }
}

/**
 * Returns an asynchronous function which evaluates each asynchronous function or Promise in the
 * supplied array, one by one, until one resolves. If all fail to resolve an Error is thrown.
 *
 * @param {Promise[]} functions - An array of asynchronous to be evaluated, one by one, until one
 * resolves.
 */
export default async function asyncFind(array) {
  const exhaustionError = new ExhaustionError();
  for (const value of array) {
    let result;
    try {
      result = await (typeof value === 'function' ? value() : value);
    } catch (error) {
      exhaustionError.internalErrors.push(error);
      continue;
    }
    return result;
  }
  throw exhaustionError;
}
