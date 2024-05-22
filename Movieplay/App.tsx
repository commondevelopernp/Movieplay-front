import React from "react";
import { View, Text } from "react-native";
import Splash from './src/auth/Splash' //<Splash/>
import Login from './src/auth/Splash/login'//<Login/>
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//const Stack = createNativeStackNavigator();

export default function App(){
  return(
    
    <View>

      <Login/>
      
    </View>
  );
}

