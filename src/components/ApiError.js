import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ApiError = () => {
  return (
    <View style={styles.container}>
      <Text>There was a network error, please retry later.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApiError;
