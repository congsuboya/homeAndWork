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
  TouchableOpacity,

} from 'react-native';

import ViewPagerAndroid from './XsyAndroidViewPager';

import { Scene, Router } from 'react-native-router-flux';

const window = Dimensions.get('window');


import ExampleList from './exampleList';
import FlatListDemo from './flatListSrc';
import SectionListDemo from './flatListSrc/SectionListDemo';


export default class HomeAndWork extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Router>
        <Scene key="exampleList" component={ExampleList} title="exampleList" navigationBarStyle={{ backgroundColor: 'yellow' }} />
        <Scene key="flatListDemo" component={FlatListDemo} title="FlatListDemo" />
        <Scene key="sectionListDemo" component={SectionListDemo} title="SectionListDemo" />
      </Router>)
  }
}



AppRegistry.registerComponent('homeAndWork', () => HomeAndWork);
