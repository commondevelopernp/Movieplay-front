import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import tabNavigator from './tabNavigator';

export type RootStackNavigationParams = {
  Landing: undefined;
  TabNavigator: undefined;
  //Include here other screens
};

const Stack = createNativeStackNavigator<RootStackNavigationParams>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Landing" component={Landing} /> */}
      <Stack.Screen
        name="TabNavigator"
        component={tabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
