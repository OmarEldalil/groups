import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardHome from './Home';
import DashboardStats from './Stats';

const DashboardStack = createStackNavigator();

const DashboardTab = () => {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen name="DashboardHome" component={DashboardHome}/>
            <DashboardStack.Screen name="DashboardStats" component={DashboardStats}/>
        </DashboardStack.Navigator>
    );
};

export default DashboardTab;