import React from 'react';
import {Button, Text, View} from 'react-native';

export default class DashboardHome extends React.Component {
    render() {
        return (

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>DashboardHome</Text>
                <Button title="Go to Statistics" onPress={() => this.props.navigation.navigate('DashboardStats')}/>
            </View>
        );
    }
}
