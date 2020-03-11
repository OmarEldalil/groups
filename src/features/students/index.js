import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import StudentsHome from './Home';
import StudentDetail from './Details';

const StudentsStack = createStackNavigator();

const StudentsTab = ()=>{
    return (
        <StudentsStack.Navigator>
            <StudentsStack.Screen name="StudentsHome" component={StudentsHome} />
            <StudentsStack.Screen name="StudentDetail" component={StudentDetail} />
        </StudentsStack.Navigator>
    );
};

export default StudentsTab