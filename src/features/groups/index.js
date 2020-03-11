import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-material-ui';

import GroupsHome from './Home';
import GroupDetail from './Details';
import AddLesson from './AddLesson';
import AddGroup from './AddGroup';

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
                            style={{marginRight: 20}}
                            underlayColor={'white'}
                            activeOpacity={0.5}
                        >
                            <Icon
                                name={'add'}
                                style={{
                                    backgroundColor: '#e91e63',
                                    color: 'white',
                                    fontSize: 35,
                                    borderRadius: 50,
                                }}
                            />
                        </TouchableHighlight>
                    ),
                })}
            />
            <GroupsStack.Screen
                name="GroupDetail"
                component={GroupDetail}
                options={({route}) => ({
                    title: route.params.title,
                    // headerStyle: {
                    //     backgroundColor: '#f4511e',
                    // },
                    // headerTintColor: '#fff',
                    // headerTitleStyle: {
                    //     fontWeight: 'bold',
                    // },
                })
                }

            />
            <GroupsStack.Screen name="AddLesson" component={AddLesson} options={{title: 'Add New Lesson'}}/>
            <GroupsStack.Screen name="AddGroup" component={AddGroup} options={{title: 'Add New Group'}}/>
        </GroupsStack.Navigator>
    );
};

export default GroupsTab;
