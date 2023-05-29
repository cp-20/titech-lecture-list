import { kv } from '@vercel/kv';

export const cacheResponse = async <K, T>(
  key: K,
  handler: (key: K) => Promise<T>,
) => {
  console.log('cacheResponse', key);

  const stringifiedKey = JSON.stringify(key);
  const response = await kv.get<T>(stringifiedKey);
  if (response !== null) {
    console.log('cacheResponse: cache hit', key);

    return response;
  }

  const result = await handler(key);
  kv.set(stringifiedKey, result, {});

  return result;
};
