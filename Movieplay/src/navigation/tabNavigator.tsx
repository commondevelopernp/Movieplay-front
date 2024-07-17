import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Favorites from '../screens/Favorites/Favorites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import {useTranslation} from 'react-i18next';
import theme from '../themes/theme';
import HomeStackNavigator from './HomeStackNavigator';

export type TabNavigatorParams = {
  HomeNavigator: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParams>();

const HomeIcon = ({color}: {color: string}) => (
  <MaterialCommunityIcons name="play-circle" color={color} size={26} />
);

const FavoritesIcon = ({color}: {color: string}) => (
  <MaterialCommunityIcons name="heart" color={color} size={26} />
);

const ProfileIcon = ({color}: {color: string}) => (
  <MaterialCommunityIcons name="cog" color={color} size={26} />
);

const TabNavigator = () => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigator"
      sceneAnimationEnabled={true}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.disabled}
      barStyle={{backgroundColor: theme.colors.tabBackground}}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: t('favorites'),
          tabBarIcon: FavoritesIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
