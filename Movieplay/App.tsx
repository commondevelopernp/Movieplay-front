import React, {useEffect, useState} from 'react';
import './assets/localization/i18n'; //Do not remove.

import {Provider} from 'react-redux';
import store from './src/store/store';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import RootStackNavigation from './src/navigation/RootNavigation';

import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import ErrorScreen from './src/screens/ErrorHandling/ErrorHandling';

enableScreens();

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected);
        setShowError(!state.isConnected);
      }
    });

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setShowError(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigation />
            <ErrorScreen
              open={showError}
              setVisible={setShowError}
              errorType="internet"
            />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
