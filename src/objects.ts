import { logError } from './logger';

function makeMap<T extends string, K>(obj: Record<T, K>) {
  const result = new Map<T, K>();

  for (const el in obj) {
    result.set(el, obj[el]);
  }

  return result;
}
function makeObject<T>(object: Record<string, T>, defaultReturn: T) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) {
        return target[prop.toString()];
      } else return defaultReturn;
    },
  });
}

function makeSet<T>(data: T[]): Set<T> {
  let set = new Set<T>();

  try {
    for (const item in data) {
      set.add(data[item]);
    }
  } catch (err) {
    logError('Error in making set.', err);
  }

  return set;
}

/**
 * Function to merge any number of object into one
 * --
 *  Example:
 *
 *  ```
 *  merge({key: 'val'}, {key: 'value'}, {bin: 'go'}) // {key: 'value', bin: 'go'}
 *  ```
 */
function merge<T extends Record<string, unknown>>(...objects: (T | undefined)[]): T {
  const mergeTwo = (
    objectOne: Record<string, unknown>,
    objectTwo: Record<string, unknown>,
  ): Record<string, unknown> => ({
    ...objectOne,
    ...objectTwo,
  });

  let result: Record<string, unknown> = {};

  for (const object of objects) {
    if (object) result = mergeTwo(result, object);
  }

  return result as T;
}

const isLastElement = (arrayLength: number) => (index: number) => index === arrayLength - 1;


export { makeMap, makeObject, makeSet,merge, isLastElement };
