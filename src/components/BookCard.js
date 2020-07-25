import React from 'react';
import {View, Text, Pressable, StyleSheet, Image} from 'react-native';

const BookCard = ({book, navigation}) => {
  const {title, image} = book;

  const handleBookSelect = (bookIsbn13) => {
    navigation.navigate('bookDetail', {bookIsbn13: bookIsbn13, name: title});
  };

  return (
    <View style={styles.container}>
      <Pressable
        key={book.isbn13}
        onPress={() => handleBookSelect(book.isbn13)}
        style={({pressed}) =>
          !pressed
            ? styles.cardContainer
            : {...styles.cardContainer, ...styles.cardContainerPressed}
        }>
        <Image
          source={{uri: image}}
          style={styles.image}
          loadingIndicatorSource={require('../assets/img/loading.gif')}
        />
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContainerPressed: {
    borderWidth: 2,
    borderColor: '#fc5185',
  },
  image: {
    width: 250,
    height: 300,
  },
  title: {
    marginTop: 0,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

export default BookCard;
