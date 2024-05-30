import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';

const Splash = () => {
  return (
    <View>
      <Image
        style={styles.ImageSplash}
        source={require('../../assets/Splash-Logo-BG.png')}
      />
    </View>
  );
};

export default Splash;
