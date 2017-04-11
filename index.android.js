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
  View,
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import OneHome from './src/oneHome.js';
import TwoHome from './src/twoHome.js';
import ThreeHome from './src/threeHome.js';


export default class myFirst extends Component {
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="oneHome" component={OneHome} title="OneHome" initial />
        <Scene key="twoHome" component={TwoHome} title="TwoHome" />
        <Scene key="threeHome" component={ThreeHome} title='ThreeHome' />
      </Scene>
    </Router>
  }
}


class MySecond extends Component {
  render() {
    return <Router>
      <Scene key="root_second">
        <Scene key="oneHome_second" component={OneHome} title="OneHome" initial />
        <Scene key="twoHome_second" component={TwoHome} title="TwoHome" />
        <Scene key="threeHome_second" component={ThreeHome} title='ThreeHome' />
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MySecond', () => MySecond);

AppRegistry.registerComponent('myFirst', () => myFirst);
