import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import DescribeScreen from '../src/screens/DescribeScreen';
import DescribeSymptomsScreen from '../src/screens/DescribeSymptomsScreen';
import DescribeDiagnosesScreen from '../src/screens/DescribeDiagnosesScreen';
import SendScreen from '../src/screens/SendScreen';
import BrowseScreen from '../src/screens/BrowseScreen';
import DiseaseDetailScreen from '../src/screens/DiseaseDetailScreen';

/**
 * Stack navigation for Describe options (symptom & diagnoses)
 */
export const DescribeOptionsStack = StackNavigator({
  Describe: {
    screen: DescribeScreen,
  },
  DescribeSymptoms: {
    screen: DescribeSymptomsScreen,
  },
  DescribeDiagnoses: {
    screen: DescribeDiagnosesScreen,
  }
}, {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

/**
 * Stack navigation for Describe menu
 */
export const DescribeStack = StackNavigator({
  Describe: {
    screen: DescribeOptionsStack,
  },
  Send: {
    screen: SendScreen,
  }
});

/**
 * Stack navigation for Browse menu
 */
export const BrowseStack = StackNavigator({
  Browse: {
    screen: BrowseScreen,
  },
  Detail: {
    screen: DiseaseDetailScreen,
  }
});

/**
 * Create tab navigator for main menu
 */
export const Tabs = TabNavigator({
  Describe: {
    screen: DescribeStack,
    navigationOptions: {
    	tabBarLabel: 'Describe',
    	tabBarIcon: ({ tintColor }) => <Icon name="pencil-square-o" size={35} color={tintColor} />
    }
  },
  Browse: {
    screen: BrowseStack,
    navigationOptions: {
    	tabBarLabel: 'Browse',
    	tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    }
  },
});


