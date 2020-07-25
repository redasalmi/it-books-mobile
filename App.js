import React from 'react';
import Books from './src/screens/Books';
import BookDetail from './src/screens/BookDetail';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="books" component={Books} options={{title: 'Books'}} />
      <Stack.Screen
        name="bookDetail"
        component={BookDetail}
        options={{title: 'Book Detail'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
