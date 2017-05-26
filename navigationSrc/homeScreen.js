
import React from 'react';
import {
    Text,
    Button,
    View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat', { user: 'Lucy', title: 'chat with me' })}
                    title="Chat with Lucy"
                />
            </View>);
    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>{params.user}</Text>
            </View>
        );
    }
}


/**
 * TabNavigator demo
 */

class RecentChartScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of recent charts</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />
            </View>)
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                />
            </View>)
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChartScreen },
    All: { screen: AllContactsScreen }
})

MainScreenNavigator.navigationOptions = {
    title: 'My Chats',
};

const SimpleApp = StackNavigator({
    Home: { screen: MainScreenNavigator },
    Chat: { screen: ChatScreen }
});

export default SimpleApp;