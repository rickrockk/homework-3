import { useEffect, useMemo } from 'react';
import qs, {ParsedQs} from 'qs';

export interface IStore {
  initializeFromParams: (params: ParsedQs) => void;
  selectedCategoryId: string;
  searchQuery: string;
}

interface UseQueryParseOptions {
  store: IStore;
  navigate: (path: string) => void;
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
}

export const useQueryParse = ({ store, navigate, arrayFormat = 'comma' }: UseQueryParseOptions) => {
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1), {
        ignoreQueryPrefix: true,
      });
      store.initializeFromParams(params);
    }
  }, [store]);

  const queryString = useMemo(() => {
    return qs.stringify(
      {
        categoryID: store.selectedCategoryId || undefined,
        searchValue: store.searchQuery || undefined,
      },
      {
        arrayFormat,
        encode: false,
      },
    );
  }, [store.selectedCategoryId, store.searchQuery, arrayFormat]);

  useEffect(() => {
    navigate(`?${queryString}`);
  }, [queryString, navigate]);
};
