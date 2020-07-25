import React from 'react';
import {View, Button} from 'react-native';
import Spinner from '../components/Spinner';
import ApiError from '../components/ApiError';
import {useBooks} from '../books/useBooks';

const Books = ({navigation}) => {
  const {books, isLoading, isError} = useBooks();

  console.log(books, isLoading, isError);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ApiError />;
  }

  return (
    <View>
      {books.books.map((book) => (
        <Button
          title={book.title}
          key={book.isbn13}
          onPress={() =>
            navigation.navigate('bookDetail', {bookIsbn13: book.isbn13})
          }
        />
      ))}
    </View>
  );
};

export default Books;
