import React from 'react';
import { Image } from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import logo from '~/assets/logo.png';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              headerTitle: <Image source={logo} />,
              headerStyle: {
                backgroundColor: '#fff',
              },
            },
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                backgroundColor: '#22202C',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
