import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StudentsHome from './Home';
import StudentDetails from './Details';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import mainStyles, {mainUnderlayColor} from '../../../util/mainStyles';
import AddStudent from './AddStudent';
import PaymentDetails from './PaymentDetail';


const StudentsStack = createStackNavigator();

const StudentsTab = () => {
    return (
        <StudentsStack.Navigator
            initialRouteName="StudentsHome"
        >
            <StudentsStack.Screen
                name="StudentsHome"
                component={StudentsHome}
                options={({route, navigation}) => ({
                    title: 'All Students',
                    headerRight: () => (
                        <TouchableHighlight
                            style={mainStyles.headerRightIconContainer}
                            onPress={() => {
                                navigation.navigate('AddStudent');
                            }}
                        >
                            <Icon
                                name="pluscircle"
                                style={mainStyles.headerRightIcon}/>
                        </TouchableHighlight>
                    ),
                })}
            />
            <StudentsStack.Screen
                name="StudentDetails"
                component={StudentDetails}
                options={({route, navigation}) => ({
                    title: route.params.student.name,
                })}
            />

            <StudentsStack.Screen
                name="AddStudent"
                component={AddStudent}
                options={(route) => ({
                    title: 'Add Student',
                })}
            />
            <StudentsStack.Screen
                name="PaymentDetails"
                component={PaymentDetails}
                options={({route}) => ({
                    title: (route.params.title && (new Date(route.params.title)).toDateString()) || 'Payment Details',
                })}
            />
        </StudentsStack.Navigator>
    );
};

export default StudentsTab;
