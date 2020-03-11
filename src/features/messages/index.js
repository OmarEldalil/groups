import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessagesHome from './Home';

const MessagesStack = createStackNavigator();

const MessagesTab = ()=>{
    return (
        <MessagesStack.Navigator>
            <MessagesStack.Screen name="Messages" component={MessagesHome} />
        </MessagesStack.Navigator>
    );
};

export default MessagesTab;
