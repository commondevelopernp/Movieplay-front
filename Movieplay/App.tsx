import React from 'react';
import './assets/localization/i18n'; //Do not remove.

import {Provider} from 'react-redux';
import store from './src/store/store';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import RootStackNavigation from './src/navigation/RootNavigation';

import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
