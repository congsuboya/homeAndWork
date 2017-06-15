import React from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    TouchableHighlight,
    Dimensions,
    PanResponder,
    ViewPagerAndroid,
    LayoutAnimation,
    UIManager
} from 'react-native';

// import ViewPagerAndroid from '../XsyAndroidViewPager';

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
        }
        this.Responder = true;
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.caseInEaseOut);

    }


    onWheel() {
        alert('nihao')
    }

    render() {
        return (
            <ScrollView
                onContentSizeChange={(contentWidth, contentHeight) => {
                    this.scrollViewContentHeight = contentHeight;
                    console.log('flatListDemonum-onscroll-ContentSizeChange', this.scrollViewContentHeight);
                }}
                onTouchStart
                stickyHeaderIndices={[1]}
                overScrollMode={'never'}
                onMomentumScrollEnd={(e) => {
                    if (e.nativeEvent.contentOffset.y > (200 + window.height) && this.state.Responder) {
                        this.setState({
                            Responder: false
                        })
                    } else if (e.nativeEvent.contentOffset.y < (200 + window.height) && !this.state.Responder) {
                        this.setState({
                            Responder: true
                        })
                    }
                    console.log('flatListDemonum-onscroll-onMomentumScrollEnd', e.nativeEvent.contentOffset.y);
                }}
                scrollEnabled={this.state.Responder}
                onScroll={(e) => {
                    this.scrollHeighted = e.nativeEvent.contentOffset.y;
                    if (e.nativeEvent.contentOffset.y > (200 + window.height)) {
                        this.setState({
                            Responder: false
                        })
                    } else if (!this.state.Responder) {
                        this.setState({
                            Responder: true
                        })
                    }
                    console.log('flatListDemonum-onscroll-scrollView', e.nativeEvent.contentOffset.y);
                }}
            >
                <View style={{ flex: 1, height: 100, backgroundColor: 'green' }} />
                <View style={{ flex: 1, height: 100, backgroundColor: 'yellow' }} />
                <ViewPagerAndroid
                    style={{ flex: 1, height: window.height * 2 }}
                    onPageSelected={(event) => {
                        if (!this.state.Responder) {
                            this.setState({
                                Responder: true,
                            })
                        }
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref={(FlatList) => this.FlatList = FlatList}
                            data={this.dataMap}
                            onMomentumScrollEnd={(e) => {
                                console.log('flatListDemonum-scrollend', e.nativeEvent.contentOffset.y);
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ height: 300, width: window.width, alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ width: 70, textAlign: 'center' }} >{item.name}</Text>
                                    </View>
                                )
                            }}
                            onScroll={(e) => {
                                if (e.nativeEvent.contentOffset.y > window.height) {
                                    this.setState({
                                        Responder: false
                                    })
                                } else if (!this.state.Responder) {
                                    this.setState({
                                        Responder: true
                                    })
                                }
                                console.log('flatListDemonum-onScroll', e.nativeEvent.contentOffset.y);
                            }}
                            keyExtractor={(item, number) => number}
                            getItemLayout={(data, index) => ({ length: 300.5, offset: 300.5 * index, index })}
                            ItemSeparatorComponent={() => <View style={{ width: window.width, height: 0.5, backgroundColor: 'green' }} />}
                            onEndReached={() => { }}
                            onEndReachedThreshold={10}
                            refreshing={false}
                            initialNumToRender={1}
                        />
                    </View>
                    <View style={{ backgroundColor: 'blue', width: window.width, height: window.height }}>
                        <View style={{ width: window.width, backgroundColor: 'red', height: 500, marginTop: this.state.childMarginTop }} />
                    </View>
                </ViewPagerAndroid>
            </ScrollView>
        )
    }
}
export default Demo;