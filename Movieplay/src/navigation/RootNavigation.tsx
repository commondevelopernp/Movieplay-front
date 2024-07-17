import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import Login from '../screens/auth/Splash/login';
import TabNavigator from './TabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export type RootStackNavigationParams = {
  Login: undefined;
  TabNavigator: undefined;
  // Include here other screens if needed
};

const Stack = createNativeStackNavigator<RootStackNavigationParams>();

const RootStackNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackNavigationParams>('Login');
  const tokenFromStore = useSelector((state: RootState) => state.auth.jwt);
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
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        if (token && validateToken(token)) {
          setInitialRoute('TabNavigator');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        setInitialRoute('Login');
      } finally {
        setLoading(false);
      }
    };
    fetchToken();
  }, [tokenFromStore]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootStackNavigation;
