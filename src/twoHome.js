import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class TwoHome extends Component{
    render(){
        return(
            <View style ={{flex:1,backgroundColor:'pink',alignItems:'center',justifyContent:'center'}}>
                <Text  style ={{fontSize:16}}>TwoHome</Text>
                <TouchableOpacity onPress ={()=>Actions.threeHome()}>
                <View  style ={{marginTop:10}}>
                    <Text style ={{fontSize:16}}>Go to ThreeHome</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}