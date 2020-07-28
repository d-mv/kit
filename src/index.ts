const RESULT: Record<string, (value: string) => string> = {
  withSymbol: (value: string): string => `$${value}`,
  withName: (value: string): string => `USD ${value}`,
  nameAtTheEnd: (value: string): string => `${value} USD`,
};

interface MakeUsdStringProps {
  value: number | string;
  option?: 'withSymbol' | 'withName' | 'nameAtTheEnd';
}

function makeUsdString({
  value,
  option = 'nameAtTheEnd',
}: MakeUsdStringProps): string {
  if (typeof value !== 'number' && typeof value !== 'string')
    return RESULT[option]('0');

  let val = value as number;

  try {
    val = parseFloat(value as string);
  } catch (err) {
    return RESULT[option]('0');
  }

  return RESULT[option](
    val.toLocaleString('en-US', {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Function to check if value is undefined or null
 */
function isNil(value?: unknown) {
  if (typeof value === 'undefined' || Object.is(value, null)) return true;
  return false;
}

/**
 * Function (browser only) to check if path provided matches current path
 */
function isPath(path: string): boolean {
  return path === globalThis.location.pathname;
}

/**
 * Function to to return number value or 0, if value is undefined,null, less than or equal to 0
 */
function valueOrZero(value: number): number {
  if (!value) return 0;

  return value;
}

function makeRound(value: number): number {
  return Math.round(value * 100);
}

/**
 * Function to assess the condition and return value, if condition is true or null, if condition is false.
 * Function supports currying to be used in composing.
 */
function ifTrue<T>(
  condition: boolean,
  value?: T
): T | null | ((val: T) => T | null) {
  function validate(val: T) {
    if (condition) return val;

    return null;
  }

  if (isNil(value)) return validate;

  return validate(value as T);
}

export { makeUsdString, isPath, valueOrZero, makeRound, ifTrue, isNil };
