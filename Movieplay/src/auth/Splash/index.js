/*import React from "react";
import { Text, Image, View } from "react-native";
import { Styles, styles } from './styles'

const Splash = () => {
  return(
      <View>
        <Image style={styles.ImageSplash} source={require('../../assets/Splash-Logo-BG.png')}/>
        
      </View>
  );
}

export default Splash;*/

import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { styles } from './styles';

const Splash = ({ switchScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      switchScreen('Login');
    }, 3000); // 3000ms = 3 segundos

    return () => clearTimeout(timer); // Limpia el temporizador en el desmontaje
  }, [switchScreen]);

  return (
    <View style={styles.container}>
      <Image style={styles.ImageSplash} source={require('../../assets/Splash-Logo-BG.png')} />
    </View>
  );
}

export default Splash;