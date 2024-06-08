import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../../themes/theme';

type LoadingProps = {
  size: 'large' | 'small' | number;
};

const Loading = ({size}: LoadingProps) => {
  return (
    <ActivityIndicator
      animating={true}
      color={theme.colors.primary}
      size={size}
    />
  );
};

export default Loading;
