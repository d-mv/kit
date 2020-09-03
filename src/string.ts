import {
  not,
  assoc,
  compose,
  forEach,
  split,
  toLower,
  replace,
  is,
  all,
  keys,
  pipe,
  join,
} from 'ramda';

function makeStringFromTemplate(
  template: string,
  params: (string | number)[],
  delimiter = '%'
): string {
  let result = template;

  if (params) {
    params.forEach((param, key) => {
      result = result.replace(
        new RegExp(`${delimiter}${key + 1}`, 'g'),
        String(param)
      );
    });
  }

  return result;
}

function makeOccurrenceObj(words: string): Record<string, number> {
  let occurrenceObj: Record<string, number> = {};

  function fn(letter: string): void {
    if (letter !== ' ')
      occurrenceObj = assoc(
        letter,
        (occurrenceObj[letter] || 0) + 1,
        occurrenceObj
      );
  }

  compose(forEach(fn), split(''), toLower, replace(' ', ''))(words);

  return occurrenceObj;
}

function fuzzyFinder(query: string, target: string): boolean {
  if (!query || !target) return false;

  if (not(is(String, query)) || not(is(String, target))) return false;

  const queryObj = makeOccurrenceObj(query);

  const targetObj = makeOccurrenceObj(target);

  const checkFn = (key: string): boolean => queryObj[key] <= targetObj[key];

  return compose(all(checkFn), keys)(queryObj);
}

function joinWords(words: string, joiner = '_'): string {
  return pipe(split(' '), join(joiner))(words);
}

function makeBemTitle(component: string, words: string): string {
  if (typeof words !== 'string' || typeof component !== 'string') return '';

  return `${component}__${joinWords(words).toLowerCase()}`;
}

export { makeStringFromTemplate, fuzzyFinder, makeBemTitle };
