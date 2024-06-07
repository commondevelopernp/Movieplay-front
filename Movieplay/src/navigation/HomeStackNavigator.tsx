import React from 'react';
import Home from '../screens/Home/Home';
import MovieSearch from '../screens/Search/MovieSearch';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieScreen from '../screens/Movie/MovieScreen';
import {IMovie} from '../store/types';

export type HomeStackNavigationParams = {
  Home: undefined;
  Search: undefined;
  Movie: {movie: IMovie};
};

const Stack = createNativeStackNavigator<HomeStackNavigationParams>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={MovieSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
