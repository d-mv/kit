import { isNil, addIndex, map, isEmpty } from 'ramda';

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

/**
 * Function to round number to whole.
 */
function makeRound(value: number): number {
  return Math.round(value * 100);
}

const ifTrue = <T, K>(condition: boolean, value: T, alt?: K) =>
  condition ? value : alt;

const ifTrueAlt = <T, K>(condition: boolean, value: T, alt: K) =>
  condition ? value : alt;

function isNilOrEmpty(data: unknown) {
  return isNil(data) || isEmpty(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function indexed<T>(mapperFn: (el: any, idx: number) => T, arr: unknown[]) {
  return addIndex(map)(mapperFn, arr) as T[];
}

const identity = (el: unknown) => !!el;

const isEqualTo = (target: unknown) => (subject: unknown) => subject === target;

export {
  makeUsdString,
  isPath,
  valueOrZero,
  makeRound,
  ifTrue,
  identity,
  isEqualTo,
  ifTrueAlt,
  isNilOrEmpty,
  indexed,
};
