import React from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    TouchableHighlight,
    Dimensions,
    PanResponder,
} from 'react-native';

import ViewPagerAndroid from '../XsyAndroidViewPager';

const window = Dimensions.get('window');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.dataMap = [];
        for (let i = 0; i < 10; i++) {
            this.dataMap.push({
                name: `名称${i}`
            })
        }
        this.state = {
            Responder: true,
            childMarginTop: 0,
            scrollOnTouch: false
        }
        this.Responder = true;
    }



    render() {
        return (
            <ScrollView
                onContentSizeChange={(contentWidth, contentHeight) => this.scrollHeight = contentHeight}
                overScrollMode={'never'}
                onMomentumScrollEnd={(e) => {
                    if (!this.state.scrollOnTouch) {
                        this.setState({
                            childMarginTop: e.nativeEvent.contentOffset.y - 1000
                        })
                    }

                    console.log('iuojlk', e.nativeEvent.contentOffset.y);
                }}
                scrollEnabled={this.state.Responder}
                onScrollShouldSetResponder={() => { return false }}
                onResponderReject={() => { return false }}
                onStartShouldSetResponderCapture={() => { return false }}
                onStartShouldSetResponder={() => { return false }}
                onScroll={(e) => {
                    this.scrollHeighted = e.nativeEvent.contentOffset.y;
                    {/*console.log('iuojlk', e.nativeEvent.contentOffset.y);*/ }
                    {/*if (this.scrollHeight > 0 && e.nativeEvent.contentOffset.y > 1020) {
                        this.setState({
                            Responder: false
                        })
                    }*/}
                }}
            >
                <TouchableHighlight>
                    <View style={{ flex: 1, height: 500, backgroundColor: 'green' }} />
                </TouchableHighlight>
                <View style={{ flex: 1, height: 500, backgroundColor: 'yellow' }} />
                <ViewPagerAndroid
                    style={[!this.state.scrollOnTouch ? { flex: 0 } : { flex: 1, height: window.height, }]}
                    onPageSelected={(event) => {
                        if (event.nativeEvent.position != 0) {
                            this.setState({
                                childMarginTop: 0,
                                scrollOnTouch: true,
                            })
                        } else {
                            this.setState({
                                scrollOnTouch: false,
                            })
                        }
                        console.log('flatListDemonumsdfsdf', event.nativeEvent.position);
                    }}
                >
                    <FlatList
                        ref={(FlatList) => this.FlatList = FlatList}
                        data={this.dataMap}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            console.log('flatListDemonum', contentHeight);
                        }}
                        renderItem={({ item }) => {
                            this.num = this.num + 1;
                            return (
                                <View style={{ height: 300, width: window.width, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: 70, textAlign: 'center' }} >{item.name}</Text>
                                </View>
                            )
                        }}
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y < 40) {
                                this.setState({
                                    Responder: true
                                })
                            };
                            console.log('iuojlk-lkill', e.nativeEvent.contentOffset.y);
                        }}
                        keyExtractor={(item, number) => number}
                        getItemLayout={(data, index) => ({ length: 300.5, offset: 300.5 * index, index })}
                        ItemSeparatorComponent={() => <View style={{ width: window.width, height: 0.5, backgroundColor: 'green' }} />}
                        ListHeaderComponent={() => <View style={{ height: 50, width: window.width, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>我是头部组件</Text>
                        </View>}
                        onEndReached={() => { }}
                        onEndReachedThreshold={10}
                        refreshing={false}
                        initialNumToRender={1}
                    />
                    <View style={{ backgroundColor: 'blue', width: window.width, height: window.height }}>
                        <View style={{ width: window.width, backgroundColor: 'red', height: 500, marginTop: this.state.childMarginTop }} />
                    </View>
                </ViewPagerAndroid>
            </ScrollView>
        )
    }
}
export default Demo;