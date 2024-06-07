/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ImageBackgroundProps,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BackgroundImageWrapperProps extends ImageBackgroundProps {
  children: ReactNode;
}

const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({
  children,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/Slash-background.png')}
      style={styles.backgroundImage}
      {...props}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}>
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default BackgroundImageWrapper;
