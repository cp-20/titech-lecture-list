import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';

const CACHE_DIR = './cache';

mkdirSync(CACHE_DIR, { recursive: true });

export const cacheFilePath = (key: string) => `${CACHE_DIR}/${key}.json`;

export const checkCache = (key: string) => existsSync(cacheFilePath(key));

export const useCache = async <T>(
  key: string,
  fallback: () => T | Promise<T>
): Promise<T> => {
  const isCached = checkCache(key);

  if (!isCached) {
    const value = await fallback();
    writeFileSync(cacheFilePath(key), JSON.stringify(value), {
      encoding: 'utf-8',
    });
    return value;
  }

  return JSON.parse(readFileSync(cacheFilePath(key), { encoding: 'utf-8' }));
};
