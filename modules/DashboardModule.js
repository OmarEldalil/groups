import React from 'react';
import {Button, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const DashboardStack = createStackNavigator();

class DashboardHome extends React.Component {
    render() {
        return (

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>DashboardHome</Text>
                <Button title="Go to Statistics" onPress={() => this.props.navigation.navigate('DashboardStats')}/>
            </View>
        );
    }
}

class DashboardStat extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>DashboardStat</Text>
            </View>
        );
    }
}

const DashboardScreen = () => {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen name="DashboardHome" component={DashboardHome}/>
            <DashboardStack.Screen name="DashboardStats" component={DashboardStat}/>
        </DashboardStack.Navigator>
    );
};

export default DashboardScreen;
