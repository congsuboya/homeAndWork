
import React, { Component } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated
} from 'react-native';

const window = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


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
    this.num = 0;
  }

  _shouldItemUpdate(prev, next) {
    console.log('_shouldItemUpdate:' + JSON.stringify(prev) + '__' + JSON.stringify(next));
    /**
     * Note that this does not check state.horizontal or state.fixedheight
     * because we blow away the whole list by changing the key in those cases.
     * Make sure that you do the same in your code, or incorporate all relevant
     * data into the item data, or skip this optimization entirely.
     */
    return prev.item !== next.item;
  }


  render() {
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <AnimatedFlatList
          debug={true}
          disableVirtualization={false}
          ref={(FlatList) => this.FlatList = FlatList}
          data={this.dataMap}
          renderItem={({ item }) => {
          this.num = this.num + 1;
            console.log('flatListDemonum', this.num);
            return (
              <View style={{ height: 700, width: window.width, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ width: 70, textAlign: 'center' }} >{item.name}</Text>
                <Image style={{ height: 45, width: 45 }} source={require('../image/default_face.png')} />
              </View>
            )
          }}
          keyExtractor={(item, number) => number}
          getItemLayout={(data, index) => ({ length: 700.5, offset: 700.5 * index, index })}
          ItemSeparatorComponent={() => <View style={{ width: window.width, height: 0.5, backgroundColor: 'green' }} />}
          ListHeaderComponent={() => <View style={{ height: 50, width: window.width, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center' }}>
            <Text>我是头部组件</Text>
          </View>}
          onEndReached={() => alert('我是onEndReached,我到最底部了')}
          onEndReachedThreshold={10}
          onRefresh={() => alert('我刷新了')}
          refreshing={false}
          shouldItemUpdate={this._shouldItemUpdate}
          initialNumToRender={1}
        />

        <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'yellow' }}>
          <TouchableOpacity onPress={() => this.FlatList._component.scrollToEnd()}>
            <View style={{ height: 50, width: 60 }}>
              <Text>去底部</Text>
            </View>
          </TouchableOpacity>
        </View >

      </View>
    )
  }
}

export default FlatListDemo;