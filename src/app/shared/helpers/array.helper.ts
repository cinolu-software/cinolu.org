/**
 * Array utility functions
 */

/**
 * Groups array items by a key
 * @param array - Array to group
 * @param keyFn - Function to extract grouping key
 * @returns Grouped object
 */
export function groupBy<T, K extends string | number>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Creates a map from array using a key function
 * @param array - Array to convert
 * @param keyFn - Function to extract key
 * @returns Map of items
 */
export function arrayToMap<T, K extends string | number>(array: T[], keyFn: (item: T) => K): Record<K, T> {
  return array.reduce(
    (result, item) => {
      result[keyFn(item)] = item;
      return result;
    },
    {} as Record<K, T>
  );
}

/**
 * Removes duplicates from array based on a key
 * @param array - Array to deduplicate
 * @param keyFn - Function to extract unique key
 * @returns Deduplicated array
 */
export function uniqueBy<T, K>(array: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return array.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Chunks array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Sorts array by multiple criteria
 * @param array - Array to sort
 * @param compareFns - Array of compare functions
 * @returns Sorted array (new array)
 */
export function sortBy<T>(array: T[], ...compareFns: ((a: T, b: T) => number)[]): T[] {
  return [...array].sort((a, b) => {
    for (const compareFn of compareFns) {
      const result = compareFn(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
}

/**
 * Filters array and returns both matched and unmatched items
 * @param array - Array to partition
 * @param predicate - Filter predicate
 * @returns Tuple of [matched, unmatched]
 */
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const matched: T[] = [];
  const unmatched: T[] = [];

  array.forEach((item) => {
    if (predicate(item)) {
      matched.push(item);
    } else {
      unmatched.push(item);
    }
  });

  return [matched, unmatched];
}
