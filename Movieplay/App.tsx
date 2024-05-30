import React from 'react';
import './assets/localization/i18n'; //Do not remove.

import {Provider} from 'react-redux';
import store from './src/store/store';
import {PaperProvider} from 'react-native-paper';
import RootStackNavigation from './src/navigation/RootNavigation';

import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Button>Press Here!</Button>
      </PaperProvider>
    </Provider>
  );
}

export default App;
