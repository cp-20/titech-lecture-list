import { atom, useAtom } from 'jotai';
import type { searchQuery } from '@/schema/searchQuery';

const searchQueryAtom = atom<searchQuery>({});

export const useSearchQueryAtom = () => {
  return useAtom(searchQueryAtom);
};
