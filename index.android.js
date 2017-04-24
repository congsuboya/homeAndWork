import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

import OneHome from './src/oneHome.js';
import TwoHome from './src/twoHome.js';
import ThreeHome from './src/threeHome.js';



export default class myFirst extends Component {
  render() {
    return <Router myType={'intial'}>
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
    return <Router myType={'intial_second'}>
      <Scene key="root_second">
        <Scene key="oneHome_second" component={OneHome} title="OneHome" initial />
        <Scene key="twoHome_second" component={TwoHome} title="TwoHome" />
        <Scene key="threeHome_second" component={ThreeHome} title='ThreeHome' />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('MySecond', () => MySecond);

AppRegistry.registerComponent('routerDemo', () => myFirst);
