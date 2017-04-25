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

import { Actions } from 'react-native-router-flux';


const window = Dimensions.get('window');

const lineView = <View style ={{backgroundColor:'black',height:0.5,width:window.window}}/>

export default class ExampleList extends Component {
    constructor(props) {
        super(props);
        this.renderItemView = this.renderItemView.bind(this);
    }

    renderItemView(itemName, clickAction) {
        return <TouchableOpacity onPress={() => clickAction()}>
            <View style={{ height: 50, width: window.width, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>{itemName}</Text>
            </View>
        </TouchableOpacity>
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 50 }}>
                {this.renderItemView('FlatListDem',()=>Actions.flatListDemo())}
                {lineView}
                {this.renderItemView('SectionListDem',()=>Actions.sectionListDemo())}
            </View>
        )
    }
}


