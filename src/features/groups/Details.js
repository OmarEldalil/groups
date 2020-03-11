import React from 'react';
import {Text, View} from 'react-native';

export default class GroupDetail extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.route.params.groupDetails.day.name}</Text>
            </View>
        );
    }
}
