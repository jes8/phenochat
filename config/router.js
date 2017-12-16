import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import DescribeScreen from '../src/screens/DescribeScreen';
import DescribeSymptomsScreen from '../src/screens/DescribeSymptomsScreen';
import DescribeDiagnosesScreen from '../src/screens/DescribeDiagnosesScreen';
import RefineSymptomsScreen from '../src/screens/RefineSymptomsScreen';
import EditDiagnosesScreen from '../src/screens/EditDiagnosesScreen';
import EditSymptomsScreen from '../src/screens/EditSymptomsScreen';
import SendScreen from '../src/screens/SendScreen';
import BrowseScreen from '../src/screens/BrowseScreen';
import BrowseDetailScreen from '../src/screens/BrowseDetailScreen';

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

      // Add dismiss to props
      const props = {
        ...this.props.screenProps,
        dismiss: () => goBack(state.key),
      };

      return (
        <StackNav
          screenProps={props}
          navigation={this.props.navigation}
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
  RefineSymptoms: {
    screen: RefineSymptomsScreen,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  }
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
  },
}, {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  }
});

/**
 * Stack navigation for Describe menu
 */
export const DescribeStack = StackNavigator({
  Describe: {
    screen: DescribeOptionsStack,
  },
  EditDiagnoses: {
    screen: EditDiagnosesScreen,
  },
  EditSymptoms: {
    screen: EditSymptomsScreen,
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
    screen: BrowseDetailScreen,
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
