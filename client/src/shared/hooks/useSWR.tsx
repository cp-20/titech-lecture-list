import useOriginalSWR from 'swr';

export const fetcher = (
  ...args: [input: RequestInfo | URL, init?: RequestInit | undefined]
) => fetch(...args).then((res) => res.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useSWR = <T = any, K = any>(key: string) => {
  return useOriginalSWR<T, K>(key, fetcher);
};
