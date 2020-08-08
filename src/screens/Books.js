import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ApiError from '../components/ApiError';
import NoBooks from '../components/NoBooks';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBooks, resetBooks} from '../features/books/booksSlice';

const Books = ({navigation}) => {
  const [page, setPage] = useState(1);
  const {
    books,
    booksPerPage,
    totalBooks,
    bookSearch,
    books_loading,
    books_error,
  } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (books_loading) {
    return <Spinner />;
  }

  if (books_error) {
    return <ApiError />;
  }

  if (books.length === 0) {
    return <NoBooks txtMessage="No Books Found." />;
  }

  const handleRefresh = () => {
    dispatch(resetBooks());
    dispatch(fetchBooks(bookSearch, 1));
  };

  const fetchMoreBooks = () => {
    if (bookSearch) {
      setPage(page + 1);
      dispatch(fetchBooks(bookSearch, page + 1));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        refreshing={false}
        onRefresh={handleRefresh}
        keyExtractor={(book) => book.isbn13}
        renderItem={({item}) => (
          <BookCard book={item} navigation={navigation} />
        )}
        onEndReached={fetchMoreBooks}
        onEndReachedThreshold={0.5}
        initialNumToRender={booksPerPage}
        ListFooterComponent={
          bookSearch && books.length < totalBooks ? (
            <Spinner />
          ) : bookSearch && books.length > totalBooks ? (
            <NoBooks txtMessage="No more books results." />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default Books;
