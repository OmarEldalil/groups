import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardTab from './src/features/dashboard';
import GroupsTab from './src/features/groups';
import StudentsTab from './src/features/students';
import MessagesTab from './src/features/messages';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const TabNavigation = createBottomTabNavigator();

class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <TabNavigation.Navigator
                    initialRouteName="groups"
                    tabBarOptions={{
                        activeTintColor: '#e91e63',
                        activeBackgroundColor: '#f7f4f4',
                    }}
                >
                    <TabNavigation.Screen
                        name="dashboard"
                        component={DashboardTab}
                        options={{
                            tabBarLabel: 'Dashboard',
                            tabBarIcon: ({color, size}) => (
                                <Icon name="view-dashboard" size={size} color={color} />
                            ),
                        }}
                    />
                    <TabNavigation.Screen
                        name="groups"
                        component={GroupsTab}
                        options={{
                            tabBarLabel: 'Groups',
                            tabBarIcon: ({color, size}) => (
                                <Icon name="google-classroom" size={size} color={color} />
                            ),
                        }}
                    />
                    <TabNavigation.Screen
                        name="students"
                        component={StudentsTab}
                         options={{
                            tabBarLabel: 'Students',
                            tabBarIcon: ({color, size}) => (
                                <Icon name="account-multiple" size={size} color={color} />
                            ),
                        }}
                    />
                    <TabNavigation.Screen
                        name="messages"
                        component={MessagesTab}
                         options={{
                            tabBarLabel: 'Messages',
                            tabBarIcon: ({color, size}) => (
                                <Icon name="comment-text-outline" size={size} color={color} />
                            ),
                        }}
                    />
                </TabNavigation.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
