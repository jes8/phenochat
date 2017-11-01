import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import DescribeScreen from '../src/screens/DescribeScreen';
import DescribeSymptomsScreen from '../src/screens/DescribeSymptomsScreen';
import DescribeDiagnosesScreen from '../src/screens/DescribeDiagnosesScreen';
import RefineDiagnosesScreen from '../src/screens/RefineDiagnosesScreen';
import SendScreen from '../src/screens/SendScreen';
import BrowseScreen from '../src/screens/BrowseScreen';
import DiseaseDetailScreen from '../src/screens/DiseaseDetailScreen';

/**
 * Dismissable modal
 * https://github.com/react-community/react-navigation/issues/686
 */
export default function DismissableStackNavigator(routes, options) {
  const StackNav = StackNavigator(routes, options);

  return class DismissableStackNav extends Component {
    static router = StackNav.router;

    render() {
      const { state, goBack } = this.props.navigation;
      const nav = {
        ...this.props.navigation,
        dismiss: () => goBack(state.key),
      };
      return (
        <StackNav
          navigation={nav}
        />
      );
    }
  }
};

/**
 * Stack navigation for Describe Diagnosis menu
 */
export const DescribeDiagnosisStack = DismissableStackNavigator({
  DescribeDiagnosesMain: {
    screen: DescribeDiagnosesScreen,
  },
  RefineDiagnoses: {
    screen: RefineDiagnosesScreen,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
});

/**
 * Stack navigation for Describe options (symptom & diagnoses)
 */
export const DescribeOptionsStack = StackNavigator({
  DescribeMain: {
    screen: DescribeScreen,
  },
  DescribeSymptoms: {
    screen: DescribeSymptomsScreen,
  },
  DescribeDiagnoses: {
    screen: DescribeDiagnosisStack,
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


