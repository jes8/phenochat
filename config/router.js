import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import DescribeScreen from '../src/screens/DescribeScreen';
import BrowseScreen from '../src/screens/BrowseScreen';

export const Tabs = TabNavigator({
  Describe: {
    screen: DescribeScreen,
    navigationOptions: {
    	tabBarLabel: 'Describe',
    	tabBarIcon: ({ tintColor }) => <Icon name="pencil-square-o" size={35} color={tintColor} />
    }
  },
  Browse: {
    screen: BrowseScreen,
    navigationOptions: {
    	tabBarLabel: 'Browse',
    	tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    }
  },
});
