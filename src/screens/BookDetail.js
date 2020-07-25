import React from 'react';
import {View, Text} from 'react-native';
import Spinner from '../components/Spinner';
import ApiError from '../components/ApiError';
import {useBookDetail} from '../books/useBooks';

const BookDetail = ({route}) => {
  const {bookIsbn13} = route.params;
  const {book, isLoading, isError} = useBookDetail(bookIsbn13);

  console.log(book, isLoading, isError);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ApiError />;
  }

  return (
    <View>
      <Text>{book.desc}</Text>
    </View>
  );
};

export default BookDetail;
