import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

const SessionDetails = (props)=>{
    useEffect(() => {
       console.log(props.route.params.sessionId);
    }, []);

    return (
        <View>
            <Text>session details</Text>
        </View>
    );
};
export default SessionDetails;
