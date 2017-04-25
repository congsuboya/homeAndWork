

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

import OneHome from './oneHome.js';
import TwoHome from './twoHome.js';
import ThreeHome from './threeHome.js';

export default class myFirst extends Component {
  render() {
    return <Router myType={'intial'}>
      <Scene key="root">
        <Scene key="oneHome" component={OneHome} title="OneHome" />
        <Scene key="twoHome" component={TwoHome} title="TwoHome" />
        <Scene key="threeHome" component={ThreeHome} title='ThreeHome' />
        <Scene
          key="tab1"
          initial
          title="Tab #1"
          navigationBarStyle={{ backgroundColor: 'red' }}
          titleStyle={{ color: 'white' }}
        >
          <Scene
            key="tab1_1"
            component={OneHome}
            title="Tab #1_1"
            onRight={() => alert('Right button')}
            rightTitle="Right"
          />
          <Scene
            key="tab1_2"
            component={TwoHome}
            title="Tab #1_2"
            titleStyle={{ color: 'black' }}
          />
        </Scene>
      </Scene>
    </Router>
  }
}