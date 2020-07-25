import useSWR from 'swr';
import axios from '../utils/axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

// fetch newest book or fetch search result
const useBooks = (search = '', page = 1) => {
  const url = !search ? '/new' : `/search/${search}/${page}`;
  const {data, error} = useSWR(url, fetcher);

  return {
    books: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// fetch single book detail
const useBookDetail = (bookIsbn13) => {
  const url = `/books/${bookIsbn13}`;
  const {data, error} = useSWR(url, fetcher);

  return {
    book: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export {useBooks, useBookDetail};
