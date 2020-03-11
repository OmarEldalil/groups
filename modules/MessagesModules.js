import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const MessagesStack = createStackNavigator();


class Messages extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Messages</Text>
            </View>
        );
    }
}

const MessagesScreen = ()=>{
    return (
        <MessagesStack.Navigator>
            <MessagesStack.Screen name="Messages" component={Messages} />
        </MessagesStack.Navigator>
    );
};

export default MessagesScreen;
