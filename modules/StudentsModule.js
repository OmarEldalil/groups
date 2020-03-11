import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const StudentsStack = createStackNavigator();

class StudentsHome extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>StudentsHome</Text>
            </View>
        );
    }
}

class StudentDetail extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>StudentDetail</Text>
            </View>
        );
    }
}


const StudentsScreen = ()=>{
    return (
        <StudentsStack.Navigator>
            <StudentsStack.Screen name="StudentsHome" component={StudentsHome} />
            <StudentsStack.Screen name="StudentDetail" component={StudentDetail} />
        </StudentsStack.Navigator>
    );
};

export default StudentsScreen;
