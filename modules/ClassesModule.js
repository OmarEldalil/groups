import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const ClassesStack = createStackNavigator();


class ClassesHome extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>ClassesHome</Text>
            </View>
        );
    }
}

class ClassDetail extends React.Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>ClassDetail</Text>
            </View>
        );
    }
}


const ClassesScreen = ()=>{
    return (
        <ClassesStack.Navigator>
            <ClassesStack.Screen name="ClassesHome" component={ClassesHome} />
            <ClassesStack.Screen name="ClassDetail" component={ClassDetail} />
        </ClassesStack.Navigator>
    );
};

export default ClassesScreen;
