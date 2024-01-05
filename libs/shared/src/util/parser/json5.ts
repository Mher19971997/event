import * as json5 from 'json5';

/**
 * @name parse
 * @param text
 * @param reviver
 */
export const parse = (text: string, reviver?: (this: any, key: string, value: any) => any): any | null => {
  try {
    return json5.parse(text, reviver);
  } catch (err) {
    console.error('JSON5.parse:error', err);
  }
  return null;
};

/**
 * @name stringify
 * @param value
 * @param replacer
 * @param space
 */
export const stringify = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number,
): string | null => {
  try {
    return json5.stringify(value, replacer, space);
  } catch (err) {
    console.error('JSON5.parse:error', err);
  }
  return null;
};

export const _json5 = { parse, stringify };
