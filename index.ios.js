/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Tabs } from './config/router';
import MainMenuView from './src/MainMenuView';

import SQLite from 'react-native-sqlite-storage';

export default class PhenoChat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs />
        <Text>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

AppRegistry.registerComponent('PhenoChat', () => PhenoChat);
