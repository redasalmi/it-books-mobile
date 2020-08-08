import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoMoreBooks = ({txtMessage}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{txtMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
    alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
  },
});

export default NoMoreBooks;
