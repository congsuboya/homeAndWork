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
                list: [{ name: 'nihao22', age: 19 }, { name: 'nihao', age: 18 }]
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.object === this.state.object)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {
                    this.setState(({ object }) => ({
                        object: object.update('list', v => v.map((item) => {
                            if (item.get('age') == 19) {
                                item = item.update('age', v => v + 10)
                            }
                            return item
                        }))
                    }))
                }}>
                    <View style={{ width: 60, height: 50, backgroundColor: 'yellow' }} >
                        <Text style={{ fontSize: 26 }} >{this.state.object.get('list').get(0).get('age')}</Text>
                    </View>
                </TouchableOpacity>
            </View >
        )
    }
} 