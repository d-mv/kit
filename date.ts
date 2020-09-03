import {
  is,
  keys,
  includes,
  assoc,
  prop,
  Placeholder,
  forEach,
  split,
} from 'ramda';

import { Type } from 'src/type_tools';

const DATE_KEYS = ['created_at', 'updated_at'];
// TODO: refactor
function dateTimeParser(key: string, value: unknown) {
  function canBeDate() {
    if (DATE_KEYS.includes(key)) return true;

    return key.split('_').includes('date') && typeof value === 'string';
  }

  if (canBeDate()) {
    const date = new Date(value as string);

    if (!isNaN(date.valueOf())) return date;
  }

  return value;
}

function adjustDate(date: unknown) {
  let parsedDate = Type<Date>(date);

  try {
    if (is(String, date)) parsedDate = new Date(date as string);

    return new Date(
      parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
    ).toISOString();
  } catch (err) {
    return new Date().toISOString();
  }
}

function dateMiddleware(this: unknown, _key: string, val: unknown): unknown {
  const valKeys = keys(val);

  // TODO: correct
  if (is(Object, val)) {
    let newValue = val;

    const fn = (el: string) => {
      const keyElements = split('_', el);

      if (includes('date', keyElements))
        newValue = assoc(
          el,
          adjustDate(prop(Type<Placeholder>(el), newValue)),
          newValue
        );
    };

    forEach(fn, valKeys);

    return newValue;
  } else return val;
}
export { dateTimeParser, dateMiddleware };
