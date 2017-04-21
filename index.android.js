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
  NativeModules,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

import { Scene, Router } from 'react-native-router-flux';

// let a = require('111');

import OneHome from './src/oneHome.js';
import TwoHome from './src/twoHome.js';
import ThreeHome from './src/threeHome.js';



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



const window = Dimensions.get('window');

class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.dataMap = [];
    for (let i = 0; i < 3000; i++) {
      this.dataMap.push({
        name: `名称${i}`,
        icon: './default_face.png'
      })
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={(FlatList) => this.FlatList = FlatList}
          data={this.dataMap}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 50, width: window.width, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ height: 45, width: 70, textAlign: 'center' }} >{item.name}</Text>
                <Image style={{ height: 45, width: 45 }} source={require('./image/default_face.png')} />
              </View>
            )
          }}
          keyExtractor={(item, number) => number}
          getItemLayout={(data, index) => ({ length: 50.5, offset: 50.5 * index, index })}
          ItemSeparatorComponent={() => <View style={{ width: window.width, height: 0.5, backgroundColor: 'green' }} />}
        />

        <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'yellow' }}>
          <TouchableOpacity onPress={() => this.FlatList.scrollToEnd(1000)}>
            <View style={{ height: 50, width: 60 }}>
              <Text>去底部</Text>
            </View>
          </TouchableOpacity>
        </View >

      </View>
    )
  }
}

import Demo from'./immutableSrc';

AppRegistry.registerComponent('FlatListDemo', () => FlatListDemo);


AppRegistry.registerComponent('MySecond', () => MySecond);

AppRegistry.registerComponent('myFirst', () => myFirst);
