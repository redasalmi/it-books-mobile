import React from 'react';
import Books from './src/screens/Books';
import BookDetail from './src/screens/BookDetail';
import Header from './src/components/Header';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from 'react-redux';
import store from './store';

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="books"
        component={Books}
        options={({navigation}) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="It Books" />
          ),
        })}
      />
      <Stack.Screen
        name="bookDetail"
        component={BookDetail}
        options={({navigation}) => ({
          headerTitle: () => (
            <Header navigation={navigation} title="Book Detail" />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
