import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ApiError from '../components/ApiError';
import {useBooks} from '../books/useBooks';

const Books = ({navigation}) => {
  const {books, isLoading, isError, mutate} = useBooks();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ApiError />;
  }

  const handleRefresh = () => {
    mutate(books, true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books.books}
        refreshing={false}
        onRefresh={handleRefresh}
        keyExtractor={(book) => book.isbn13}
        renderItem={({item}) => (
          <BookCard book={item} navigation={navigation} />
        )}
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
