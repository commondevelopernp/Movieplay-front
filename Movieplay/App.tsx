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
import {configureGoogleSignIn} from './src/config/GoogleSignInConfig';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

enableScreens();
configureGoogleSignIn();

const firebaseConfig = {
  apiKey: 'AIzaSyBE0tJopsQ2oY_Re6o0Fnlzh_s5AtqBKWk',
  projectId: 'appdistribuidas-a444b',
  storageBucket: 'appdistribuidas-a444b.appspot.com',
  appId: '1:387572187599:android:08b822a62d83b555ba52ba',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userClaims, setUserClaims] = useState<any>(null); // Estado para almacenar las claims del usuario
  const validateToken = (token: string): boolean => {
    try {
      const decoded: {exp: number} = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (token && validateToken(token)) {
          const decodedToken = jwtDecode(token); // Decodificar el token JWT
          setIsLoggedIn(true);
          setUserClaims(decodedToken); // Almacenar las claims del usuario en el estado
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(isLoggedIn);
        console.error('Failed to fetch the token from storage:', error);
        setIsLoggedIn(false);
      }
    };
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigation />
            {showError && (
              <ErrorScreen
                open={showError}
                setVisible={setShowError}
                errorType="internet"
              />
            )}
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
