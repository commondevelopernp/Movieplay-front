import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../auth/Splash/login';
import MovieCard from '../Movie/Components/MovieCard';

export type RootStackNavigationParams = {
  Login: undefined;
  //TabNavigator: undefined;
  //Include here other screens
};

const Stack = createNativeStackNavigator<RootStackNavigationParams>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={MovieCard}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="TabNavigator"
        component={tabNavigator}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
