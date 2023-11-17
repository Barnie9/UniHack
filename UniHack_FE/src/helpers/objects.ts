import { isEqual } from "lodash";

/**
 * Comparison between two objects returning a new object with differences only
 *
 * @param {Object} base 	Object to compare with
 * @param {Object} object 	Object compared
 *
 * @returns {Object} 		New object containing the new fields that changed
 */
export function objectDifference<T>(base: T, object: T): Partial<T> {
  const difference: Partial<T> = {};

  for (const key in object) {
    // @ts-ignore
    if (key in base) {
      const baseValue = base[key];
      const objectValue = object[key];

      if (!isEqual(baseValue, objectValue)) difference[key] = objectValue;
    }
  }

  return difference;
}
