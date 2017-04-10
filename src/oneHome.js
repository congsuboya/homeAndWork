import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class OneHome extends Component{
    render(){
        return(
            <View style ={{flex:1,backgroundColor:'yellow',alignItems:'center',justifyContent:'center'}}>
                <Text  style ={{fontSize:16}}>OneHome</Text>
                <TouchableOpacity onPress ={()=>Actions.twoHome()}>
                <View style ={{marginTop:10}} >
                    <Text style ={{fontSize:16}}>Go to TwoHome</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}