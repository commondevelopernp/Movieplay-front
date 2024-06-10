/*
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Splash from './src/auth/Splash';
import Login from './src/auth/Splash/login'//<Login/>

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('Login');
    }, 5000); // 5000ms = 5 segundos

    return () => clearTimeout(timer); // Limpia el temporizador en el desmontaje
  }, []);

  let screen;
  if (currentScreen === 'Splash') {
    screen = <Splash />;
  } else if (currentScreen === 'Login') {
    screen = <Login />;
  }

  return (
    <View style={{ flex: 1 }}>
      {screen}
    </View>
  );
}

*/

import React, { useState } from "react";
import { View } from "react-native";
import Splash from './src/auth/Splash';
import Login from './src/auth/Splash/login'//<Login/>

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const switchScreen = (screen: React.SetStateAction<string>) => {
    setCurrentScreen(screen);
  };

  let screen;
  if (currentScreen === 'Splash') {
    screen = <Splash switchScreen={switchScreen} />;
  } else if (currentScreen === 'Login') {
    screen = <Login />;
  }

  return (
    <View style={{ flex: 1 }}>
      {screen}
    </View>
  );
}
