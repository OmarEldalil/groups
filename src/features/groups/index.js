import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import GroupsHome from './Home';
import GroupDetails from './Details';
import AddSession from './AddSession';
import AddGroup from './AddGroup';
import mainStyles, {mainColorTheme} from '../../../util/mainStyles';
import AddMoreStudents from './AddMoreStudents';
import AddPayment from './AddPayment';

const GroupsStack = createStackNavigator();


const GroupsTab = () => {
    return (
        <GroupsStack.Navigator>
            <GroupsStack.Screen
                name="GroupsHome"
                component={GroupsHome}
                options={({route, navigation}) => ({
                    title: 'My Groups',
                    headerRight: () => (
                        <TouchableHighlight
                            onPress={() => {
                                navigation.navigate('AddGroup');
                            }}
                            style={mainStyles.headerRightIconContainer}
                            underlayColor={'#b9b9b9'}
                            activeOpacity={0.2}
                        >
                            <Icon
                                name={'pluscircle'}
                                style={mainStyles.headerRightIcon}
                            />
                        </TouchableHighlight>
                    ),
                })}
            />
            <GroupsStack.Screen
                name="GroupDetails"
                component={GroupDetails}
                options={({route, navigation}) => ({
                    title: route.params.title,
                })}


            />
            <GroupsStack.Screen
                name="AddSession"
                component={AddSession}
                options={({route, navigation}) => ({
                    title: 'Add Session',
                })}
            />
            <GroupsStack.Screen
                name="AddMoreStudents"
                component={AddMoreStudents}
                options={({route, navigation}) => ({
                    title: 'Add More Students',
                })}
            />
            <GroupsStack.Screen
                name="AddGroup"
                component={AddGroup}
                options={{title: 'Add New Group'}}
            />
            <GroupsStack.Screen
                name="AddPayment"
                component={AddPayment}
                options={{title: 'Pay'}}
            />
        </GroupsStack.Navigator>
    );
};

export default GroupsTab;
