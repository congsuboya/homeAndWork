
import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    Animated,
    SectionList
} from 'react-native';

const window = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HeaderComponent = <View style={{ height: 50, backgroundColor: 'red', width: window.window }} />
const FooterComponent = <View style={{ height: 50, backgroundColor: 'purple', width: window.window }} />
const ItemSeparator = <View style={{ width: window.width, height: 0.5, backgroundColor: 'green' }} />
const SectionComponent = <View style={{ height: 30, width: window.width, backgroundColor: 'gray', justifyContent: 'center' }}>
    <Text> 我是SectionComponent</Text>
</View>

const renderSectionHeader = ({ section }) => (
    <View>
        <Text style={{ padding: 4, }}>SECTION HEADER: {section.key}</Text>
        <View style={{ width: window.width, height: 0.5, backgroundColor: 'red' }} />
    </View>
);

const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};

class SectionListDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.dataMap = [];
        for (let i = 0; i < 3000; i++) {
            this.dataMap.push({
                name: `名称${i}`,
                icon: './default_face.png'
            });
        }
    }


    _renderItemComponent = ({ item }) =>
        <View style={{ height: 50, width: window.width }}>
            <Text>{item.text}</Text></View>;



    render() {
        return (
            <View style={{ flex: 1, marginTop: 50 }}>
                <SectionList
                    ListHeaderComponent={()=>HeaderComponent}
                    ListFooterComponent={()=>FooterComponent}
                    ItemSeparatorComponent={()=>ItemSeparator}
                    SectionSeparatorComponent={()=>SectionComponent}
                    enableVirtualization={true}
                    onRefresh={() => alert('onRefresh: nothing to refresh :P')}
                    refreshing={false}
                    renderItem={this._renderItemComponent}
                    renderSectionHeader={renderSectionHeader}
                    sections={[
                        {
                            key: 's1', data: [
                                { title: 'Item In Header Section', text: 'Section s1', key: '0' },
                            ]
                        },
                        {
                            key: 's2', data: [
                                { noImage: true, title: 'First item', text: 'Section s2', key: '0' },
                                { noImage: true, title: 'Second item', text: 'Section s2', key: '1' },
                                
                            ]
                        }
                    ]}
                    viewabilityConfig={VIEWABILITY_CONFIG}
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

export default SectionListDemo;