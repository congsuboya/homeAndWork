import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import { fromJS, Iterable, Set, List } from 'immutable';

export default class ImmutableDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: fromJS({
                name: 'heihei',
                list: [{ name: 'nihao22', age: 18 }, { name: 'nihao', age: 18 }]
            })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {
                    let templist = this.state.object.get('list');
                    let tempItem = this.state.object.get('list').map((item)=>item.set('age', 30));
                    this.setState({
                        
                    })
                }}>
                    <View style={{ width: 60, height: 50, backgroundColor: 'yellow' }} >
                        <Text style={{ fontSize: 26 }} >{this.state.object.get('list').get(0).get('age')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
} 