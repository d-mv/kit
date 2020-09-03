import { isEmpty, isNil, not, is } from 'ramda';
import { dateTimeParser, dateMiddleware } from 'date';
import { logError } from './logger';

/**
 * Safe parsing of the string with default return
 * @param data unknown
 * @param defaultReturn any or equal to return
 */
const parse = <T, K = T>(data: unknown, defaultReturn: K): T | K => {
  if (isNil(data) || isEmpty(data)) return defaultReturn;

  if (not(is(String, data))) return defaultReturn;

  try {
    return JSON.parse(data as string, dateTimeParser) ?? defaultReturn;
  } catch (err) {
    logError('Error in parse', err);
    return defaultReturn;
  }
};

function stringify(payload: unknown) {
  if (isNil(payload) || isEmpty(payload)) return '';

  let result = '';

  try {
    result = JSON.stringify(payload, dateMiddleware);
  } catch (err) {
    logError('Unable to stringify', err);
  }

  return result;
}

function deserialize<T>(data: string, defaultReturn: T): T {
  if (isNil(data) || isEmpty(data)) return defaultReturn;

  if (not(is(String, data))) return defaultReturn;

  try {
    // eslint-disable-next-line no-eval
    return (eval('(' + data + ')') as T) || defaultReturn;
  } catch (err) {
    logError('Error in deserialize', err);
    return defaultReturn;
  }
}

export { stringify, parse, deserialize };
