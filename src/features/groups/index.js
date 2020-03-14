import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import GroupsHome from './Home';
import GroupDetail from './Details';
import AddLesson from './AddLesson';
import AddGroup from './AddGroup';
import mainStyles from '../../../util/mainStyles';

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
